import React, { memo } from 'react';
import HelpLayout from '../../components/HelpLayout';

export default memo(function HelpPage({ page }: { page: string }) {
  return <HelpLayout>{page}</HelpLayout>;
});

export async function getStaticPaths() {
  return {
    paths: [{ params: { page: 'introduction' } }, { params: { page: 'faq' } }, { params: { page: 'rules' } }, { params: { page: 'contact' } }],
    fallback: false
  };
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  return { props: { page: params.page } };
}
