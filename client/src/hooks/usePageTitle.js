import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title
      ? `${title} | ContractSense`
      : 'ContractSense | AI Contract Intelligence';
  }, [title]);
};

export default usePageTitle;