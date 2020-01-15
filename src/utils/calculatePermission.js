export const calculatePermission = (item, userAuth) =>
{
    let permissionToEditDistrict = (userAuth.districtRights.find(element => element.id === item.district_id) || userAuth.importanceRights.all);
    let permissionToEditImportance = false;
    if (item.importance) {
        switch (item.importance.replace(/\s\s+/g, ' ').toUpperCase()) {
            case "FEDERAL":
                permissionToEditImportance = userAuth.importanceRights.federal || userAuth.importanceRights.all;
                permissionToEditDistrict = true;
                break;
            case "REGIONAL":
                permissionToEditImportance = userAuth.importanceRights.regional || userAuth.importanceRights.all;
                if (userAuth.regionalRoadsAllDistricts) permissionToEditDistrict = true;
                break;
            case "MUNICIPAL":
                permissionToEditImportance = userAuth.importanceRights.municipal || userAuth.importanceRights.all;
                if (userAuth.municipalRoadsAllDistricts) permissionToEditDistrict = true;
                break;
            default:
                permissionToEditImportance = true;
                permissionToEditDistrict = true;
        }
    } else {
        permissionToEditImportance = true;
        permissionToEditDistrict = true;
    }
    console.log(item.district_id)
    const permissionToEdit = permissionToEditDistrict && permissionToEditImportance;
    console.log('permission:' + permissionToEdit)
    return permissionToEdit;
}
