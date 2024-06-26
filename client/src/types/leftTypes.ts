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
  group_name: string | null;
  group_handle: string;
  group_current_issue: string;
  group_description: string;
  group_stances: string;
  affiliate_relation_date: string;
  animate?: boolean;
}

export interface Individual {
  individual_name: string | null;
  individual_username: string;
  individual_current_issue: string;
  individual_description: string;
  individual_roles: string;
  affiliate_relation_date: string;
  animate?: boolean;
}

export interface Organization {
  organization_name: string | null;
  organization_handle: string;
  organization_current_issue: string;
  organization_description: string;
  organization_stances: string;
  affiliate_relation_date: string;
  animate?: boolean;
}

export interface LeftVerticalSplitPaneProps {
  leftSpaceContentContainerRef: React.RefObject<HTMLDivElement>;
}

export interface GroupCardsProps {
  leftTopPaneRef: React.RefObject<HTMLDivElement>;
}

export interface IndividualCardsProps {
  leftTopPaneRef: React.RefObject<HTMLDivElement>;
}

export interface IndividualCardProps {
  name: string | null;
  username: string;
  current_issue: string | null;
  animate?: boolean;
}

export interface GroupCardProps {
  name: string | null;
  handle: string;
  current_issue: string | null;
  affInCommon: string | null;
  animate?: boolean;
}

export interface OrganizationCardProps {
  name: string | null;
  handle: string;
  current_issue: string | null;
  stances: string | null;
  animate?: boolean;
}

export interface OrganizationCardsProps {
  leftTopPaneRef: React.RefObject<HTMLDivElement>;
}

export interface RecHeaderProps {
  lightness: number;
  togglePaneHeight: () => void;
}
