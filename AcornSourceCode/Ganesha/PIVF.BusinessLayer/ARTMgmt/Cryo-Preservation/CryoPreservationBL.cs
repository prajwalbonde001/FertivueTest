using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation;
using PIVF.Entities.Models.ARTMgmt.Cryo_Preservation.OocyteVitrification;
using PIVF.Entities.Models.Patient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIVF.BusinessLayer.ARTMgmt.Cryo_Preservation
{
    public interface CryoPreservationBL
    {
        int SaveOocyteVitrification(List<IVF_VitrificationDetailsVO> IVF_VitrificationVO);
        IVF_VitrificationVO GetVitriDetails(bool IsOnlyVitrification, bool IsForThawTab);
        OocyteThawingVO GetVitrificationSummaryList();
        int SaveOocyteThawing(List<OocyteThawingVO> obj);
        //IVF_VitrificationVO GetVitrificationDetailsOocyteBank(int PageIndex,bool IsSinglePatient, int UnitID, int TankID, int CanisterID, int ColorCodeID, int GobletSizeId, string NameCodeMRNo, bool IsShowDiscard,string StatusOption,string Action,int IsExpired);  // Commented on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
        IVF_VitrificationVO GetVitrificationDetailsOocyteBank(int PageIndex, bool IsSinglePatient, int UnitID, int TankID, int CanisterID, int ColorCodeID, int GobletSizeId, string NameCodeMRNo, bool IsShowDiscard, string StatusOption, string Action, int IsExpired, int NearExpiryDays);  // Modified on 17thMar2021 for Victory client request :: to search near expiry embryos with duration
        IVF_VitrificationVO GetVitrificationBankHistory(int UnitID, int VitrificationID, int VitrificationUnitID, int EmbNumber, int EmbSerialNumber,string Action);
        List<clsPatientVO> GetDonorList();
        List<IVF_VitrificationDetailsVO> GetVitrificationDetails(long VitriFicationID, long VitriFicationUnitID); //ocyet
        List<IVF_VitrificationDetailsVO> GetEmbriyoVitrificationDetails(long VitriFicationID, long VitriFicationUnitID);//emb
        long TransferDonorOocytestoCouple(List<IVF_VitrificationDetailsVO> TransferData); //oocyet 
        long TransferDonorEmbriyostoCouple(List<IVF_VitrificationDetailsVO> TransferData);//emb
        long DonateOocytefromBank(long VitrivicationID, long VitrificationUnitID, long VitrificationDetailID, string VitrificationNo, long TransferDonorID, long TransferDonorUnitID);
        long DonateEmbryofromBank(long VitrivicationID, long VitrificationUnitID, long VitrificationDetailID, string VitrificationNo, long TransferDonorID, long TransferDonorUnitID);
        int SaveTransportDetails(IVF_VitrificationDetailsVO obj);
        int InsertUpdateOocytrEmbryoVitrification(List<IVF_VitrificationDetailsVO> IVF_VitrificationVO);
        int CheckDuplicateFreezingNo(string Item,bool Flag);
      
    }
}
