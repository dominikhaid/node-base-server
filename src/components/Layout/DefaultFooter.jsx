import React from 'react';
import DefaultVerticalLinkList from '@/components/Elements/Lists/DefaultVerticalLinkList';
import DefaultFooterCopyright from '@/components/Elements/Text/DefaultFooterCopyright';
import Link from 'next/link';
import styled from 'styled-components';

export default function DefaultFooter(props) {
  const StyledFooterSection = styled.section`
    max-width: 500px;
    margin: auto;
  `;

  return (
    <>
      {props.children}
      <StyledFooterSection>
        <DefaultVerticalLinkList />
        <DefaultFooterCopyright />
      </StyledFooterSection>
    </>
  );
}
