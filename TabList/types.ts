/* eslint-disable */

export interface TabListComponentProps {
  useDarkMode: Boolean;
  primaryColor: String | null;
  tabData: any[];
  useTestData: boolean;
  updateSelectedItem: (newRecordID: any) => void
}

export interface iconProps {
  d: string;
  fill?: string;
}

export interface TabItemProps {
  label: string;
  icon: iconProps
}
