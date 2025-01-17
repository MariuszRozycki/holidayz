import { forwardRef } from "react";
import NavMainLayout from "../Nav/NavMainLayout";

const HeaderMainLayout = forwardRef<HTMLDivElement>((_, headerRef) => {
  return <NavMainLayout ref={headerRef} />;
});

HeaderMainLayout.displayName = "HeaderMainLayout";

export default HeaderMainLayout;
