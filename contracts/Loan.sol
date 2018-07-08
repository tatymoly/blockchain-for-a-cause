pragma solidity ^0.4.23;
// pragma experimental ABIEncoderV2;

contract Loan {

    struct Lender {
        address lenderAddress;
        string lenderName;
        uint loanId;
    }

    struct Borrower {
        address borrowerAddress;
        string borrowerName;
        uint loanId;
    }

    struct DrawdownSchedule {
        uint loanid; 
        uint256 drawdownDate;
        uint256 drawdownRequest;
        uint256 totalDrawdown;
        uint256 openCommitement;
    }

    struct LoanData {
        Lender lender;
        Borrower borrower;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 signingDate;
        string purposeLoan;
        uint256 tranches;
        bool confirmed;
    }

    struct Progress {
        uint loanId;
        uint256 date;
        uint256 borrowerDrawdown; 
        uint256 lenderOutstandingCommitment;
        uint256 borrowerTotalDrawdownAmount;
        uint256 borrowerInterestPayment;
        uint256 borrowerRepayments;
        bool done;
    }

    //This value is 0 only if no contracts are available
    uint loanId = 0;

    DrawdownSchedule[] drawdownSchedule;

    mapping (uint => LoanData) loans;
    mapping (address => Lender) lenders;
    mapping (address => Borrower) borrowers;
    mapping (uint => Progress) loanProgress;

    function findCurrentLoanId() public view returns (uint loanIdentifier) {
        
        uint tempLoanId = 0;

        if (lenders[msg.sender].loanId > 0) {
            tempLoanId = lenders[msg.sender].loanId;
        } else {
            if (borrowers[msg.sender].loanId > 0) {
                tempLoanId = borrowers[msg.sender].loanId;
            }
        }
        return tempLoanId;
    }

    /*
    * Lender requests Loan 
    */
    function requestLoan(string lenderName, string borrowerName, address borrowerAddress, string purposeLoan, uint256 loanAmount, uint256 tranchesTmp, uint256 interestRate, uint256 signingDate, uint256 firstDrawdownDate) public returns (bool success) {
        
        loanId++;
        
        //@todo: Now the loans are 1-to-1 from 1 Lender to 1 Borrower.
        //this needs to be changes to accept Many to Many 
    
        lenders[msg.sender] = Lender(msg.sender, lenderName, loanId);
        borrowers[borrowerAddress] = Borrower(borrowerAddress, borrowerName, loanId);
        loans[loanId] = LoanData(lenders[msg.sender],borrowers[borrowerAddress], loanAmount, interestRate, signingDate, purposeLoan, tranchesTmp, false);
        
        uint256 firstDrawdownAmount = loanAmount/tranchesTmp;
        uint256 _openCommitement = loanAmount - firstDrawdownAmount;
        drawdownSchedule.push(DrawdownSchedule(loanId, firstDrawdownDate, firstDrawdownAmount, loanAmount, _openCommitement));
        
        loanProgress[loanId] = Progress(loanId, firstDrawdownDate, firstDrawdownAmount, _openCommitement, firstDrawdownAmount, 0, 0, false);

        return true;
    }

    /*
    * Borrower confirms the loan
    */
    function confirmLoan () public returns (bool success) { 
        
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);

        require (msg.sender == loans[tempLoanId].borrower.borrowerAddress);

        loans[tempLoanId].confirmed = true;

        return true;
    }

    function getToTalLoanAmount() public view returns (uint256 totalAmount) {
        
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);
        return loans[tempLoanId].loanAmount;
    }

    function getInitialDrawdownAmount() public view returns (uint256 initialDrawdownAmount) {
        
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);

        return loanProgress[tempLoanId].borrowerDrawdown;
    }

    //Lender triggers initial cash payment
    function initialCashPayment (uint date) public payable returns (uint data) {
                
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);
        require (msg.value > 0);

        loans[tempLoanId].borrower.borrowerAddress.transfer(msg.value);
        loanProgress[tempLoanId].done = true;
        loanProgress[tempLoanId].date = date;

        return tempLoanId;
    }

    function findBorrowerDrawdownAmount() public view returns (uint256 currentBorrowerDrawdownAmount) {
        
        //First, find LoanId
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);

        //Second, called drawdown Amount
        return loanProgress[tempLoanId].borrowerTotalDrawdownAmount;
    }

    function findRegularDrawdownAmount() public view returns (uint256 currentDrawdownAmount) {
        
        //First, find LoanId
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);

        //Second, calculate unit tranches
        uint256 unitTranches = loans[tempLoanId].loanAmount/loans[tempLoanId].tranches;

        return unitTranches;
    }


    //findLendersOpenCommitment
    function findLendersOpenCommitment() public view returns (uint256 lenderOutstandingCommitment) {
        
        //First, find LoanId
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);

        //Second, return the value
        return loanProgress[tempLoanId].lenderOutstandingCommitment;
    }

    function findCurrentProjectProgress() public view returns (uint expectedProgress) {
        
        //First, find LoanId
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);

        //Second, calculate expected project progress
        return uint256(100)*(loanProgress[tempLoanId].borrowerTotalDrawdownAmount)/loans[tempLoanId].loanAmount;
    }

    
    //
    function verifyDrawdownApproval(uint projectProgress) public returns (bool confirmation) {
        
        //First, find Loan Id
        uint tempLoanId = findCurrentLoanId();
        //Second, update Loan Progress
        require(tempLoanId > 0);
        
        //Second, calculate unit tranches and confirm that drawdown amount is not higher than total loan amount
        uint256 unitTranches = loans[tempLoanId].loanAmount/loans[tempLoanId].tranches;
        if (loanProgress[tempLoanId].borrowerTotalDrawdownAmount + unitTranches > loans[tempLoanId].loanAmount) {
            loanProgress[tempLoanId].lenderOutstandingCommitment = 0;
            return false;
        }

        //Third, verify if expected progress is correct
        uint expectedProgress = uint256(100)*(loanProgress[tempLoanId].borrowerTotalDrawdownAmount)/loans[tempLoanId].loanAmount;
        if (projectProgress >= expectedProgress) return true;
        else return false;
    }

    //Borrower requests regular loan
    function requestDrawdown(uint256 date) public payable returns(bool success) {
        //Find loan Id
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);
        require (msg.value > 0);
        require (msg.sender == loans[tempLoanId].borrower.borrowerAddress);

        //Calculating the new values
        uint256 _newBorrowerTotalDrawdownAmount = loanProgress[tempLoanId].borrowerTotalDrawdownAmount + msg.value;
        uint256 _newLendersOpenCommitement = loanProgress[tempLoanId].lenderOutstandingCommitment - msg.value;
        if (_newBorrowerTotalDrawdownAmount == loans[tempLoanId].loanAmount) {
            _newLendersOpenCommitement = 0;
        }
        uint256 _newBorrowerInterestPayment = uint256(30)*loanProgress[tempLoanId].borrowerTotalDrawdownAmount*loans[tempLoanId].interestRate/uint256(360*100);
        uint256 _newBorrowerRepayments = 0;
        
        //Updating Loan Progress
        loanProgress[tempLoanId] = Progress(tempLoanId, date, msg.value, _newLendersOpenCommitement, _newBorrowerTotalDrawdownAmount, _newBorrowerInterestPayment, _newBorrowerRepayments, true);

        //Value Transfer
        loans[tempLoanId].borrower.borrowerAddress.transfer(msg.value - _newBorrowerInterestPayment);
        
        return true;
    }

    function findLoansInterestRate() public view returns (uint256 interestRate) {
        //Find loan Id
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);

        return loans[tempLoanId].interestRate;
    }

    function getPaymentInterest() public view returns (uint256 lenderCommitmentAmount) {
        
        //Find loan Id
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);

        return loanProgress[tempLoanId].borrowerInterestPayment;
    }

    function verifyRepayment(uint256 repayment) public view returns (bool verify) {
        //Find loan Id
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);
        require (msg.sender == loans[tempLoanId].borrower.borrowerAddress);
        require (repayment > 0);
        require (repayment < loans[tempLoanId].loanAmount);
        require (loanProgress[tempLoanId].borrowerRepayments + repayment <= loans[tempLoanId].loanAmount);

        return true;
    }

    
    function requestRepayment(uint256 date) public payable returns(bool success) {
        //Find loan Id
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);
        require (msg.sender == loans[tempLoanId].borrower.borrowerAddress);
        require (msg.value > 0);
        require (msg.value <= loans[tempLoanId].loanAmount);
        require (loanProgress[tempLoanId].borrowerRepayments + msg.value <= loans[tempLoanId].loanAmount);

        //
        // Calculating the new values
        uint256 _newBorrowerTotalDrawdownAmount = loanProgress[tempLoanId].borrowerTotalDrawdownAmount - msg.value;
        uint256 _newLendersOpenCommitement = loanProgress[tempLoanId].lenderOutstandingCommitment;
        uint256 _newBorrowerInterestPayment = uint256(30)*loanProgress[tempLoanId].borrowerTotalDrawdownAmount*loans[tempLoanId].interestRate/uint256(360*100);
        uint256 _newBorrowerRepayments = loanProgress[tempLoanId].borrowerRepayments + msg.value;
        
        //Updating Loan Progress
        loanProgress[tempLoanId] = Progress(tempLoanId, date, msg.value, _newLendersOpenCommitement, _newBorrowerTotalDrawdownAmount, _newBorrowerInterestPayment, _newBorrowerRepayments, true);

        //Value Transfer
        loans[tempLoanId].lender.lenderAddress.transfer(msg.value + _newBorrowerInterestPayment);
      
        return true;
    }

    function findTotalRepaymentAmount() public view returns (uint256 repaymentAmount) {
        //Find loan Id
        uint tempLoanId = findCurrentLoanId();
        require (tempLoanId > 0);

        return loanProgress[tempLoanId].borrowerRepayments;
    }
}