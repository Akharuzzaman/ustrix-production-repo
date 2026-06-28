import LandingIcon, { type LandingIconName } from './landing-icons';

type TrustIconProps = {
  type: LandingIconName;
};

export default function TrustIcon({ type }: TrustIconProps) {
  return <LandingIcon name={type} size={22} />;
}
