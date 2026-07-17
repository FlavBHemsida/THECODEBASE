import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AdventureGate from '@/components/AdventureGate';

const SiteEntryGate = () => {
  const [entered, setEntered] = useState(false);
  const { pathname } = useLocation();

  // /var-resa shows its own landing gate, so skip the site-wide one there.
  const skipGate = pathname === '/var-resa';

  useEffect(() => {
    document.body.style.overflow = entered || skipGate ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [entered, skipGate]);

  return (
    <AnimatePresence>
      {!entered && !skipGate && (
        <AdventureGate key="site-gate" onEnter={() => setEntered(true)} zIndexClass="z-[9999]" />
      )}
    </AnimatePresence>
  );
};

export default SiteEntryGate;
