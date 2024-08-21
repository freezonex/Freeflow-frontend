'use client';
import React, { useContext } from 'react';
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
  SwitcherDivider,
  Toggle,
  Theme,
} from '@carbon/react';

import {
  EnergyRenewable,
  Dashboard,
  IbmAiopsInsights,
  LoadBalancerVpc,
  Subflow,
  AlignHorizontalCenter,
  User,
  Information,
  Settings,
  Cicsplex,
  Alarm,
  Connect,
  ConnectTarget,
  Platforms,
  BuildTool,
  Application,
} from '@carbon/icons-react';
import { usePathname } from 'next/navigation';
import { ThemeContext } from '@/utils/ThemeContext';
import { useRouter } from 'next/navigation';

export const HeaderWSideNav = ({ isExpanded, toggleSideNavExpanded }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useContext(ThemeContext);
  const isCurrentPath = (path) => {
    return (process.env.PATH_PREFIX + path).trim() === pathname;
  };

  return (
    <Header aria-label="FreezoneX FreeFlow">
      <SkipToContent />
      <HeaderGlobalAction>
        <Connect
          aria-label={isExpanded ? 'Close menu' : 'Open menu'}
          onClick={toggleSideNavExpanded}
          isActive={isExpanded}
          aria-expanded={isExpanded}
        />
      </HeaderGlobalAction>
      <HeaderName
        prefix="FreezoneX"
        onClick={() => {
          router.push(`/`);
        }}
        className="cursor-pointer border-b-[1px] border-solid border-[#94C518]"
      >
        FreeFlow
      </HeaderName>
      <Theme theme={theme.sideNavTheme}>
        <SideNav
          className="shadow w-10"
          aria-label="Side navigation"
          expanded={isExpanded}
          addFocusListeners={false}
          onOverlayClick={() => {}}
        >
          <SideNavItems isSideNavExpanded={isExpanded}>
            <SideNavLink
              renderIcon={ConnectTarget}
              title="Connect"
              onClick={() => {
                router.push('/connect');
              }}
              isActive={isCurrentPath('/connect')}
            >
              Connect
            </SideNavLink>
            <SideNavMenu
              renderIcon={ConnectTarget}
              title="Connect"
              onClick={() => {
                router.push('/connect');
              }}
            >
              <SideNavMenuItem href="https://www.ibm.com" target="_blank">
                Node1
              </SideNavMenuItem>
            </SideNavMenu>
            <SideNavMenu renderIcon={Platforms} title="UNS">
              <SideNavMenuItem href="https://www.ibm.com" target="_blank">
                Broker
              </SideNavMenuItem>
              <SideNavMenuItem
                onClick={() => {
                  router.push('/uns/browser');
                }}
                isActive={isCurrentPath('/uns/browser')}
              >
                Browser
              </SideNavMenuItem>
            </SideNavMenu>
            <SideNavMenu renderIcon={BuildTool} title="App Builder">
              <SideNavMenuItem href="https://www.ibm.com" target="_blank">
                IIoT App
              </SideNavMenuItem>
              <SideNavMenuItem
                onClick={() => {
                  router.push('/builder/craft');
                }}
                isActive={isCurrentPath('/builder/craft')}
              >
                Craft
              </SideNavMenuItem>
              <SideNavMenuItem
                onClick={() => {
                  router.push('/builder/craftBackend');
                }}
                isActive={isCurrentPath('/builder/craftBackend')}
              >
                Craft Backend
              </SideNavMenuItem>
            </SideNavMenu>
            <SideNavMenu renderIcon={Application} title="App">
              <SideNavMenuItem href="https://www.ibm.com" target="_blank">
                App1
              </SideNavMenuItem>
            </SideNavMenu>
          </SideNavItems>
        </SideNav>
      </Theme>
      <HeaderGlobalBar className="flex items-center">
        <Toggle
          labelA="Light"
          labelB="Dark"
          className="mr-[2rem]"
          size="sm"
          id="theme-toggle"
          toggled={theme.headerTheme === 'g100'}
          onToggle={(e) => {
            console.log(e);
            if (e) {
              setTheme({
                headerTheme: 'g100',
                contentTheme: 'g10',
                sideNavTheme: 'g90',
              });
            } else {
              setTheme({
                headerTheme: 'white',
                contentTheme: 'g10',
                sideNavTheme: 'white',
              });
            }
          }}
        />
        <HeaderGlobalAction aria-label="Settings">
          <Settings size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User">
          <User size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Info" tooltipAlignment="end">
          <Information size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};
