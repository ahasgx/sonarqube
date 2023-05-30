/*
 * SonarQube
 * Copyright (C) 2009-2023 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import styled from '@emotion/styled';
import { ReactNode, useCallback, useState } from 'react';
import tw from 'twin.macro';
import { themeColor, themeContrast } from '../../helpers/theme';
import { BareButton } from '../buttons';
import { OpenCloseIndicator } from '../icons/OpenCloseIndicator';
import { SubnavigationGroup } from './SubnavigationGroup';

interface CommonProps {
  children: ReactNode;
  className?: string;
  header: ReactNode;
  id: string;
  onSetExpanded?: (expanded: boolean) => void;
}

interface ControlledProps extends CommonProps {
  expanded: boolean | undefined;
  initExpanded?: never;
}

interface UncontrolledProps extends CommonProps {
  expanded?: never;
  initExpanded?: boolean;
}

type Props = ControlledProps | UncontrolledProps;

export function SubnavigationAccordion(props: Props) {
  const { children, className, expanded, header, id, initExpanded, onSetExpanded } = props;

  const [innerExpanded, setInnerExpanded] = useState(initExpanded ?? false);
  const finalExpanded = expanded ?? innerExpanded;

  const toggleExpanded = useCallback(() => {
    setInnerExpanded(!finalExpanded);
    onSetExpanded?.(!finalExpanded);
  }, [finalExpanded, onSetExpanded]);

  return (
    <SubnavigationGroup
      aria-labelledby={`${id}-subnavigation-accordion-button`}
      className={className}
      id={`${id}-subnavigation-accordion`}
      role="region"
    >
      <SubnavigationAccordionItem
        aria-controls={`${id}-subnavigation-accordion`}
        aria-expanded={finalExpanded}
        id={`${id}-subnavigation-accordion-button`}
        onClick={toggleExpanded}
      >
        {header}
        <OpenCloseIndicator open={finalExpanded} />
      </SubnavigationAccordionItem>
      {finalExpanded && children}
    </SubnavigationGroup>
  );
}

const SubnavigationAccordionItem = styled(BareButton)`
  ${tw`sw-flex sw-items-center sw-justify-between`}
  ${tw`sw-box-border`}
  ${tw`sw-body-sm-highlight`}
  ${tw`sw-p-4`}
  ${tw`sw-w-full`}
  ${tw`sw-cursor-pointer`}

  color: ${themeContrast('subnavigation')};
  background-color: ${themeColor('subnavigation')};
  transition: 0.2 ease;
  transition-property: border-left, background-color, color;

  &:hover,
  &:focus {
    background-color: ${themeColor('subnavigationHover')};
  }
`;
SubnavigationAccordionItem.displayName = 'SubnavigationAccordionItem';
