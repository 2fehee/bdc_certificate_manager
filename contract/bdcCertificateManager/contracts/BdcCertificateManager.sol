pragma solidity 0.4.24;
import "@openzeppelin/upgrades/contracts/Initializable.sol";
 
contract BdcCertificateManager is Initializable{
 
    address public manager;
     
    struct certificate {
		address verifierAddress;
        string  bID;
        string  cID;
        string  evID;
        string  soh;
		string  grade;
		string  expirationDate;
		string  certificateHash;
        bool    isLatest;
    }
    
    mapping(string => mapping(string => certificate)) private certificates;
    mapping(string => string[]) private certificateList;
     
    modifier owneronly {
      require (msg.sender == manager, "ERROR_NOT_OWNER");
      _;
    }

    function initialize() initializer public {
        manager = msg.sender;
    }
    
     
    function createCertificate(string memory _bID, string memory _evID, string memory _soh, string memory _grade, string memory _expirationDate, string  _certificateHash) public owneronly returns(string memory, string memory){
         
        require(bytes(_bID).length > 0 && bytes(_evID).length > 0 && bytes(_soh).length > 0 && bytes(_grade).length > 0 && bytes(_expirationDate).length > 0 && bytes(_certificateHash).length > 0, "ERROR_PARAMETERS");
        
		string memory _cID = string(abi.encodePacked("CID_", _bID, "_", _evID, "_", _expirationDate));
		
        certificates[_bID][_cID].verifierAddress = msg.sender;
        certificates[_bID][_cID].bID = _bID;
	    certificates[_bID][_cID].cID = _cID;
        certificates[_bID][_cID].evID = _evID;
        certificates[_bID][_cID].soh = _soh;
		certificates[_bID][_cID].grade = _grade;
		certificates[_bID][_cID].expirationDate = _expirationDate;
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
         
      certificate memory cc = certificates[_bID][_cID];
      return (cc.bID, cc.cID, cc.evID, cc.grade, cc.expirationDate, cc.certificateHash, cc.isLatest);
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