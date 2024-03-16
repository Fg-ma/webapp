// Global
export interface LeftState {
  page: {
    left: {
      pagePayload: {
        pageState: string;
      };
    };
  };
}

export interface Group {
  group_id: string;
  group_name: string;
  group_handle: string;
  group_currentIssue: string;
  group_description: string;
  group_stances: string;
  affiliate_relation_date: string;
  animate?: boolean;
}

export interface Individual {
  individual_id: string;
  individual_name: string;
  individual_username: string;
  individual_currentIssue: string;
  individual_description: string;
  individual_roles: string;
  affiliate_relation_date: string;
  animate?: boolean;
}

export interface Organization {
  organization_id: string;
  organization_name: string;
  organization_handle: string;
  organization_currentIssue: string;
  organization_description: string;
  organization_stances: string;
  affiliate_relation_date: string;
  animate?: boolean;
}

/*
  LeftNav.tsx
  Global LeftState 
*/

/* 
  LeftVerticalSplitPane.tsx
  Global LeftState 
*/

export interface LeftVerticalSplitPaneProps {
  leftSpaceContentContainerRef: React.RefObject<HTMLDivElement>;
}

/* 
  GroupCards.tsx
  Global Group
*/

/* 
  GroupRecs.tsx
  Global Group
*/

/* 
  IndividualCards.tsx
  Global Individual
*/

/* 
  IndividualRecs.tsx
  Global Individual
*/

/* 
  LeftSpaceCards.tsx
*/

export interface IndividualCardProps {
  id: string;
  name: string;
  currentIssue: string | null;
  animate?: boolean;
}

export interface GroupCardProps {
  id: string;
  name: string;
  currentIssue: string | null;
  affInCommon: string | null;
  animate?: boolean;
}

export interface OrganizationCardProps {
  id: string;
  name: string;
  currentIssue: string | null;
  stances: string | null;
  animate?: boolean;
}

/* 
  OrganizationCards.tsx
  Global Organization
*/

/* 
  OrganizationRecs.tsx
  Global Organization
*/

/* 
  RecHeader.tsx
*/

export interface RecHeaderProps {
  lightness: number;
  togglePaneHeight: () => void;
}
