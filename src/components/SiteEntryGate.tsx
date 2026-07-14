import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AdventureGate from '@/components/AdventureGate';

const SiteEntryGate = () => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [entered]);

  return (
    <AnimatePresence>
      {!entered && (
        <AdventureGate key="site-gate" onEnter={() => setEntered(true)} zIndexClass="z-[9999]" />
      )}
    </AnimatePresence>
  );
};

export default SiteEntryGate;
