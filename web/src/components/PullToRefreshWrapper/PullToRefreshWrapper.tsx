import { ReactElement } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import styled from "styled-components";

interface PullToRefreshWrapperProps {
  children: ReactElement;
}

const Container = styled.div`
  height: 100%;
  overflow: auto;
`;

const Wrapper = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: -webkit-fill-available;
  }
`;

const PullToRefreshWrapper = ({ children }: PullToRefreshWrapperProps) => {
  const handleRefresh = async () => {
    window.location.reload();
  };

  return (
    <Container>
      <PullToRefresh
        onRefresh={handleRefresh}
        pullingContent={<div>⬇️ Pull to refresh</div>}
        refreshingContent={<div>🔄 Refreshing...</div>}
      >
        <Wrapper>{children}</Wrapper>
      </PullToRefresh>
    </Container>
  );
};

export default PullToRefreshWrapper;
