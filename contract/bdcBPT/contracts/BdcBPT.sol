pragma solidity >=0.4.22 <0.7.0;

contract BdcCertificateManager{

    address public manager;

    struct certificate {
		address verifierAddress;
        string  bID;
        string  cID;
		string  grade;
		string  evaluationDate;
		string  evaluationAgency;
		string  certificateHash;
        bool    isLatest;
    }

    mapping(string => mapping(string => certificate)) private certificates;
    mapping(string => string[]) private certificateList;

    modifier owneronly {
      require (msg.sender == manager, "ERROR_NOT_OWNER");
      _;
    }

    constructor () public {
        manager = msg.sender;
    }


    function createCertificate(string memory _bID, string memory _cID, string memory _grade, string memory _evaluationDate, string memory _evaluationAgency, string memory _certificateHash) public owneronly returns(string memory, string memory){

        require(bytes(_bID).length > 0 && bytes(_cID).length > 0 && bytes(_grade).length > 0 && bytes(_evaluationDate).length > 0 && bytes(_evaluationAgency).length > 0 && bytes(_certificateHash).length > 0, "ERROR_PARAMETERS");


        certificates[_bID][_cID].verifierAddress = msg.sender;
        certificates[_bID][_cID].bID = _bID;
	    certificates[_bID][_cID].cID = _cID;
		certificates[_bID][_cID].grade = _grade;
		certificates[_bID][_cID].evaluationDate = _evaluationDate;
		certificates[_bID][_cID].evaluationAgency = _evaluationAgency;
		certificates[_bID][_cID].certificateHash = _certificateHash;
        certificates[_bID][_cID].isLatest = true;

		for(uint i=0;i<certificateList[_bID].length;i++) {
            if(certificates[_bID][certificateList[_bID][i]].isLatest == true)
                certificates[_bID][certificateList[_bID][i]].isLatest = false;
        }

        certificateList[_bID].push(_cID);

        return (_bID, _cID);
    }

    function checkOldCertificate(string memory _bID, string memory _cID, string memory _certificateHash) public view returns(bool) {
		if(compareStrings(certificates[_bID][_cID].bID, _bID) == true && compareStrings(certificates[_bID][_cID].cID, _cID) == true && compareStrings(certificates[_bID][_cID].certificateHash, _certificateHash) == true)
			return true;

        return false;
    }

	function checkLatestCertificate(string memory _bID, string memory _cID, string memory _certificateHash) public view returns(bool) {
		if(compareStrings(certificates[_bID][_cID].bID, _bID) == true && compareStrings(certificates[_bID][_cID].cID, _cID) == true && compareStrings(certificates[_bID][_cID].certificateHash, _certificateHash) == true && certificates[_bID][_cID].isLatest == true)
			return true;

        return false;
    }

    function getcertificateCount(string memory _bID) public view returns(uint) {
        return certificateList[_bID].length;
    }

    function certificateInfo(string memory _bID, string memory _cID) public view returns(string memory, string memory, string memory, string memory, string memory, string memory, bool) {
	  require(certificateList[_bID].length > 0);

      certificate memory ci = certificates[_bID][_cID];
      return (ci.bID, ci.cID, ci.grade, ci.evaluationDate, ci.evaluationAgency, ci.certificateHash, ci.isLatest);
    }

    function deleteAllData(string memory _bID) public owneronly {

        for(uint i=0;i<certificateList[_bID].length;i++) {
            delete certificates[_bID][certificateList[_bID][i]];
        }
        delete certificateList[_bID];

    }

    function compareStrings (string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }

}