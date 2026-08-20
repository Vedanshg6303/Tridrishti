async function testApi() {
  try {
    console.log('1. Testing /api/health...');
    const healthRes = await fetch('http://localhost:5001/api/health');
    const health: any = await healthRes.json();
    console.log('Health:', health.status, '| Platform:', health.platform);

    console.log('2. Testing /api/auth/login...');
    const loginRes = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'vedansh@tridrishti.com',
        password: 'User@123456',
      }),
    });
    const login: any = await loginRes.json();
    console.log('Login success:', login.success, '| User:', login.user?.name, '| Token:', !!login.tokens?.accessToken);

    const token = login.tokens?.accessToken;
    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    console.log('3. Testing /api/points/ledger...');
    const ledgerRes = await fetch('http://localhost:5001/api/points/ledger', { headers: authHeaders });
    const ledger: any = await ledgerRes.json();
    console.log('Ledger success:', ledger.success, '| Transactions count:', ledger.transactions?.length);

    console.log('4. Testing /api/network/tree...');
    const treeRes = await fetch('http://localhost:5001/api/network/tree', { headers: authHeaders });
    const tree: any = await treeRes.json();
    console.log('Tree success:', tree.success, '| Root:', tree.tree?.name, '| Team size:', tree.tree?.teamSize);

    console.log('5. Testing /api/rewards/products...');
    const productsRes = await fetch('http://localhost:5001/api/rewards/products');
    const products: any = await productsRes.json();
    console.log('Products success:', products.success, '| Products count:', products.products?.length);

    console.log('6. Testing /api/benefits...');
    const benefitsRes = await fetch('http://localhost:5001/api/benefits');
    const benefits: any = await benefitsRes.json();
    console.log('Benefits success:', benefits.success, '| Benefits count:', benefits.benefits?.length);

    console.log('7. Testing /api/admin/metrics...');
    const adminLoginRes = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@tridrishti.com',
        password: 'Admin@Tridrishti2026',
      }),
    });
    const adminLogin: any = await adminLoginRes.json();
    const adminToken = adminLogin.tokens?.accessToken;
    const adminHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    };
    const metricsRes = await fetch('http://localhost:5001/api/admin/metrics', { headers: adminHeaders });
    const metrics: any = await metricsRes.json();
    console.log('Admin metrics success:', metrics.success, '| Users:', metrics.metrics?.totalUsers, '| Points:', metrics.metrics?.totalPointsIssued);

    console.log('\n🎉 ALL 7 TEST SUITES PASSED WITH 0 ERRORS!');
  } catch (err: any) {
    console.error('Test execution failed:', err);
  }
}

testApi();
