export const calculatePermission = (item, userAuth) =>
{
    const permissionToEditDistrict = (userAuth.districtRights.find(element => element.id === item.district_id) || userAuth.importanceRights.all);
    let permissionToEditImportance = false;
    if (item.importance) {
        switch (item.importance.replace(/\s\s+/g, ' ').toUpperCase()) {
            case "FEDERAL":
                permissionToEditImportance = userAuth.importanceRights.federal || userAuth.importanceRights.all;
                break;
            case "REGIONAL":
                permissionToEditImportance = userAuth.importanceRights.regional || userAuth.importanceRights.all;
                break;
            case "MUNICIPAL":
                permissionToEditImportance = userAuth.importanceRights.municipal || userAuth.importanceRights.all;
                break;
            default:
                permissionToEditImportance = false;
        }
    } else permissionToEditImportance = true;

    const permissionToEdit = permissionToEditDistrict && permissionToEditImportance;
    return permissionToEdit;
}
