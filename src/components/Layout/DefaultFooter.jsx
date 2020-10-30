import React from 'react';
import DefaultVerticalLinkList from '@/components/Elements/Lists/DefaultVerticalLinkList';
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
        <p style={{textAlign: 'center'}}>
          &copy;&nbsp;E-Commerce Demo&nbsp;DominikHaid
        </p>
        <p style={{textAlign: 'center', width: '100%'}}>
          <Link target="_blank" href="https://www.dominikhaid.de">
            www.dominikhaid.de
          </Link>
        </p>
      </StyledFooterSection>
    </>
  );
}
