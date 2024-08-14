'use client';

import React, { useState, useContext } from 'react';
import { HeaderWSideNav } from '@/components/Header/Header';
import { Content, Theme } from '@carbon/react';
import { ThemeContext } from '@/utils/ThemeContext';

export default function Providers({ children }) {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);
  function toggleSideNavExpanded() {
    setIsSideNavExpanded(!isSideNavExpanded);
  }
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <Theme theme={theme.headerTheme}>
        <HeaderWSideNav
          isExpanded={isSideNavExpanded}
          toggleSideNavExpanded={toggleSideNavExpanded}
        />
      </Theme>
      <Theme theme={theme.contentTheme}>
        <Content
          className="pt-20 h-full min-h-screen"
          // className={`pt-20 h-screen transition-[margin-left] duration-110 ease-in-out ${
          //   isSideNavExpanded ? 'ml-52' : 'ml-0'
          // }`}
        >
          {children}
        </Content>
      </Theme>
    </>
  );
}
