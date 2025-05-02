import BreadCrumbs from '@components/BreadCrumbs';

function Doctor() {
  return (
    <main>
      <BreadCrumbs
        links={[
          {
            link_name: 'Dashboard',
            link_to: '/',
          },
          {
            link_name: 'Doctores',
            link_to: '/doctor',
          },
        ]}
        loading={false}
      />
      <h1>Doctores</h1>
    </main>
  );
}

export default Doctor;
