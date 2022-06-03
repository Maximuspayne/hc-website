export const rankIDToImage = (rankID) => {
    switch(rankID){
        case 35:
            return "rank-adm5.png";
        case 34:
            return "rank-adm4.png";
        case 33:
            return "rank-adm3.png";
        case 32:
            return "rank-adm2.png";
        case 31:
            return "rank-adm1.png";
        case 30:
            return "rank-adm1.png";
        case 26:
            return "rank-cpt.png";
        case 25:
            return "rank-cdr.png";
        case 24:
            return "rank-ltcd.png";
        case 23:
            return "rank-lt.png";
        case 22:
            return "rank-ltjg.png";
        case 21:
            return "rank-ens.png";
        case 15:
            return "rank-warrant3.png";
        case 14:
            return "rank-warrant3.png";
        case 13:
            return "rank-warrant3.png";
        case 12:
            return "rank-warrant2.png";
        case 11:
            return "rank-warrant1.png";
        case 10:
            return "rank-warrant1.png";
        case 9:
            return "rank-cpo.png";
        case 8:
            return "rank-cpo.png";
        case 7:
            return "rank-cpo.png";
        case 6:
            return "rank-po1.png";
        case 5:
            return "rank-po2.png";
        case 4:
            return "rank-po3.png";
        case 3:
            return "rank-seaman.png";
        case 2:
            return "rank-seamanapprentice.png";
        case 1:
            return "rank-seamanrecruit.png";
    } 
}

export const rankIDToName = (rankID) => {
    switch(rankID){
        case 35:
            return "Fleet Admiral";
        case 34:
            return "Admiral";
        case 33:
            return "Vice Admiral";
        case 32:
            return "Rear Admiral (Upper)";
        case 31:
            return "Rear Admiral (Lower)";
        case 30:
            return "Commodore";
        case 26:
            return "Captain";
        case 25:
            return "Commander";
        case 24:
            return "Lt. Commander";
        case 23:
            return "Lieutenant";
        case 22:
            return "Lt. Junior Grade";
        case 21:
            return "Ensign";
        case 15:
            return "Chief Warrant Officer-5";
        case 14:
            return "Chief Warrant Officer-4";
        case 13:
            return "Chief Warrant Officer-3";
        case 12:
            return "Chief Warrant Officer-2";
        case 11:
            return "Chief Warrant Officer-1";
        case 10:
            return "Warrant Officer";
        case 9:
            return "Master CPO";
        case 8:
            return "Senior CPO";
        case 7:
            return "Chief Petty Officer";
        case 6:
            return "Petty Officer (1st class)";
        case 5:
            return "Petty Officer (2nd class)";
        case 4:
            return "Petty Officer (3rd class)";
        case 3:
            return "Seaman";
        case 2:
            return "Seaman-Apprentice";
        case 1:
            return "Seaman-Recruit";
        default:
            return "";
    }
};

export const rankIDToShortName = (rankID) => {
    switch(rankID){
        case 35:
            return "FADM";
        case 34:
            return "ADM";
        case 33:
            return "VADM";
        case 32:
            return "RADM";
        case 31:
            return "RDML";
        case 30:
            return "COMM";
        case 26:
            return "CAPT";
        case 25:
            return "CDR";
        case 24:
            return "LCDR";
        case 23:
            return "LT";
        case 22:
            return "LTJG";
        case 21:
            return "ENS";
        case 15:
            return "CWO5";
        case 14:
            return "CWO4";
        case 13:
            return "CWO3";
        case 12:
            return "CWO2";
        case 11:
            return "CWO1";
        case 10:
            return "WO";
        case 9:
            return "MCPO";
        case 8:
            return "SCPO";
        case 7:
            return "CPO";
        case 6:
            return "PO1";
        case 5:
            return "PO2";
        case 4:
            return "PO3";
        case 3:
            return "SN";
        case 2:
            return "SA";
        case 1:
            return "SR";
        default:
            return "";
    }
};