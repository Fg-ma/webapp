import React from "react";
import { useDispatch } from "react-redux";
import { setPageState } from "@redux/pageState/pageStateActions";

interface EntityPageFooterProps {
  entityType: string;
  entity: EntityData | null;
}

interface EntityData {
  [key: string]: any;
  individual_id?: number;
  individual_name?: string;
  individual_userName?: string;
  individual_roles?: string;
  individual_currentIssue?: string;
  individual_description?: string;
  group_id?: number;
  group_name?: string;
  group_handle?: string;
  group_stances?: string;
  group_currentIssue?: string;
  group_description?: string;
  organization_id?: number;
  organization_name?: string;
  organization_handle?: string;
  organization_stances?: string;
  organization_currentIssue?: string;
  organization_description?: string;
}

export default function EntityPageFooter({
  entityType,
  entity,
}: EntityPageFooterProps) {
  const dispatch = useDispatch();

  function swapPageState(newState: string) {
    dispatch(setPageState("main", newState));
  }

  return (
    <div className="h-10 bg-fg-white-85 flex items-center justify-between">
      <button
        className="h-10 aspect-square bg-cover bg-no-repeat ml-2"
        style={{
          backgroundImage: 'url("/assets/icons/navigateBack.svg")',
        }}
        onClick={() => swapPageState("home")}
      ></button>
      <p className="text-3xl mt-2">
        {entity?.[`${entityType.slice(0, -1)}_name`]}
      </p>
      <button
        className="h-8 aspect-square bg-cover bg-no-repeat mr-4"
        style={{
          backgroundImage: 'url("/assets/icons/moreHorizontal.svg")',
        }}
      ></button>
    </div>
  );
}
