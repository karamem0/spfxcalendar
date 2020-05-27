export enum PermissionKind {
  EmptyMask = 0,
  ViewListItems = 1,
  AddListItems = 2,
  EditListItems = 3,
  DeleteListItems = 4,
  ApproveItems = 5,
  OpenItems = 6,
  ViewVersions = 7,
  DeleteVersions = 8,
  CancelCheckout = 9,
  ManagePersonalViews = 10,
  ManageLists = 12,
  ViewFormPages = 13,
  AnonymousSearchAccessList = 14,
  Open = 17,
  ViewPages = 18,
  AddAndCustomizePages = 19,
  ApplyThemeAndBorder = 20,
  ApplyStyleSheets = 21,
  ViewUsageData = 22,
  CreateSSCSite = 23,
  ManageSubwebs = 24,
  CreateGroups = 25,
  ManagePermissions = 26,
  BrowseDirectories = 27,
  BrowseUserInfo = 28,
  AddDelPrivateWebParts = 29,
  UpdatePersonalWebParts = 30,
  ManageWeb = 31,
  AnonymousSearchAccessWebLists = 32,
  UseClientIntegration = 37,
  UseRemoteAPIs = 38,
  ManageAlerts = 39,
  CreateAlerts = 40,
  EditMyUserInfo = 41,
  EnumeratePermissions = 63,
  FullMask = 65,
}

export class Permission {

  public high: number;
  public low: number;

  constructor(value?: any) {
    if (value == null) {
      return;
    }
    this.high = value.High;
    this.low = value.Low;
  }

  public has(perm: PermissionKind): boolean {
    if (perm == PermissionKind.EmptyMask) {
      return true;
    }
    if (perm == PermissionKind.FullMask) {
      if ((this.high & 32767) == 32767) {
        return this.low == 65535;
      } else {
        return false;
      }
    }
    const num1 = perm - 1;
    const num2 = 1;
    if (num1 >= 0 && num1 < 32) {
      return (this.low & (num2 << num1)) != 0;
    }
    if (num1 >= 32 && num1 < 64) {
      return (this.high & (num2 << num1 - 32)) != 0;
    }
    return false;
  }

}
