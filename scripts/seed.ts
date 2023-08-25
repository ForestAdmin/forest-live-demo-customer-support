import 'dotenv/config';

import pg from 'pg';
import fs from 'fs';
import path from 'path';

import createUsers from './users';
import createAddresses from './addresses';
import createBillingInfos from './billingInfos';
import createOrders from './orders';
import createPlans from './plans';
import createSubscriptions from './subscriptions';
import createMessages from './messages';
import createComments from './comments';
import createTickets from './tickets';
import createCoupons from './coupons';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_TLS_REJECT_UNAUTHORIZED,
});


(async () => {
  const userIds = await createUsers(pool);
  await createAddresses(pool, userIds);
  await createBillingInfos(pool, userIds);
  await createOrders(pool, userIds);
  const planIds = await createPlans(pool);
  const ticketIds = await createTickets(pool, userIds)
  await createSubscriptions(pool, userIds, planIds);
  await createMessages(pool, userIds);
  await createComments(pool, userIds, ticketIds);
  await createCoupons(pool, userIds);
  console.log('ok');
})();