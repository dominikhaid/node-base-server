import React from 'react';
import DefaultMainMenu from '@/components/Elements/Menu/DefaultMainMenu';
import DefaultShopMenu from '@/components/Elements/Menu/DefaultShopMenu';
import DefaultImage from '@/components/Elements/Images/DefaultImage';
import styled from 'styled-components';

export default function DefaultTopBar({appState}) {
  const StyledTopLogo = styled.section`
    flex: 1 1 350px;
    max-width: max-content;
    margin-right: 3rem;
  `;
  const StyledTopNav = styled.nav`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    .ant-menu {
      font-size: 1.2rem;
    }
    #topShopMenu {
      max-width: 100%;
    }
    #topShopMenu::before {
      border-left: 1px solid white;
      margin: 5px 0px;
      width: 10px;
      height: 10px;
      display: contents;
    }

    .anticon {
      font-size: 1.2rem;
      border: 1px solid white;
      border-radius: 50%;
      padding: 0.5rem;
    }
    .ant-menu {
      flex: 1 1 350px;
      max-width: max-content;
      margin-right: 3rem;
    }
  `;

  const StyledLogo = styled(DefaultImage)`
    padding: 5px;
  `;

  return (
    <React.Fragment>
      <StyledTopNav id="topNav">
        <StyledTopLogo>
          <StyledLogo
            src="/images/logos/secondary.png"
            alt="Our brand new Bike Shop"
            width={150}
            height={50}
          />
        </StyledTopLogo>
        <DefaultMainMenu />
        <DefaultShopMenu appState={appState} />
      </StyledTopNav>
    </React.Fragment>
  );
}
