/* eslint-disable no-console */
import 'dotenv/config';

import Knex from 'knex';
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

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

(async () => {
  console.log('Creating users...');
  const userIds = await createUsers(knex);
  console.log('Creating addresses...');
  await createAddresses(knex, userIds);
  console.log('Creating billing infos...');
  await createBillingInfos(knex, userIds);
  console.log('Creating coupons...');
  const couponIds = await createCoupons(knex, userIds);
  await createBillingInfos(knex, userIds);
  console.log('Creating orders...');
  await createOrders(knex, userIds, couponIds);
  console.log('Creating plans...');
  const planIds = await createPlans(knex);
  console.log('Creating tickets...');
  const ticketIds = await createTickets(knex, userIds);
  console.log('Creating subscriptions...');
  await createSubscriptions(knex, userIds, planIds);
  console.log('Creating messages...');
  await createMessages(knex, userIds);
  console.log('Creating comments...');
  await createComments(knex, userIds, ticketIds);
  console.log('Tables created!');
  await knex.destroy();
})();
