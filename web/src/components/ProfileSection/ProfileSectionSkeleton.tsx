import React from "react";
import * as S from "./styles";

const ProfileSectionSkeleton: React.FC = () => {
  return (
    <S.ProfileContainer data-testid="profile-section-skeleton">
      <S.ProfileHeader>
        <S.SkeletonBlock width="70%" height="32px" marginBottom="16px" />
      </S.ProfileHeader>
      <S.ProfileContent>
        <S.SkeletonBlock
          width="120px"
          height="120px"
          borderRadius="50%"
          style={{ flexShrink: 0 }}
        />
        <S.ProfileDetails>
          <S.DetailItem>
            <S.SkeletonBlock width="30%" height="16px" marginBottom="8px" />
            <S.SkeletonBlock width="80%" height="24px" />
          </S.DetailItem>
          <S.DetailItem>
            <S.SkeletonBlock width="40%" height="16px" marginBottom="8px" />
            <S.SkeletonBlock width="90%" height="24px" />
          </S.DetailItem>
          <S.DetailItem>
            <S.SkeletonBlock width="35%" height="16px" marginBottom="8px" />
            <S.SkeletonBlock width="70%" height="24px" />
          </S.DetailItem>
        </S.ProfileDetails>
      </S.ProfileContent>
    </S.ProfileContainer>
  );
};

export default ProfileSectionSkeleton;
