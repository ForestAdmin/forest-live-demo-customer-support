/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type AddressesCustomizer = CollectionCustomizer<Schema, 'addresses'>;
export type AddressesRecord = TPartialRow<Schema, 'addresses'>;
export type AddressesConditionTree = TConditionTree<Schema, 'addresses'>;
export type AddressesFilter = TPaginatedFilter<Schema, 'addresses'>;
export type AddressesSortClause = TSortClause<Schema, 'addresses'>;
export type AddressesAggregation = TAggregation<Schema, 'addresses'>;

export type BillingInfosCustomizer = CollectionCustomizer<Schema, 'billing_infos'>;
export type BillingInfosRecord = TPartialRow<Schema, 'billing_infos'>;
export type BillingInfosConditionTree = TConditionTree<Schema, 'billing_infos'>;
export type BillingInfosFilter = TPaginatedFilter<Schema, 'billing_infos'>;
export type BillingInfosSortClause = TSortClause<Schema, 'billing_infos'>;
export type BillingInfosAggregation = TAggregation<Schema, 'billing_infos'>;

export type CommentsCustomizer = CollectionCustomizer<Schema, 'comments'>;
export type CommentsRecord = TPartialRow<Schema, 'comments'>;
export type CommentsConditionTree = TConditionTree<Schema, 'comments'>;
export type CommentsFilter = TPaginatedFilter<Schema, 'comments'>;
export type CommentsSortClause = TSortClause<Schema, 'comments'>;
export type CommentsAggregation = TAggregation<Schema, 'comments'>;

export type CouponsCustomizer = CollectionCustomizer<Schema, 'coupons'>;
export type CouponsRecord = TPartialRow<Schema, 'coupons'>;
export type CouponsConditionTree = TConditionTree<Schema, 'coupons'>;
export type CouponsFilter = TPaginatedFilter<Schema, 'coupons'>;
export type CouponsSortClause = TSortClause<Schema, 'coupons'>;
export type CouponsAggregation = TAggregation<Schema, 'coupons'>;

export type MessagesCustomizer = CollectionCustomizer<Schema, 'messages'>;
export type MessagesRecord = TPartialRow<Schema, 'messages'>;
export type MessagesConditionTree = TConditionTree<Schema, 'messages'>;
export type MessagesFilter = TPaginatedFilter<Schema, 'messages'>;
export type MessagesSortClause = TSortClause<Schema, 'messages'>;
export type MessagesAggregation = TAggregation<Schema, 'messages'>;

export type OrdersCustomizer = CollectionCustomizer<Schema, 'orders'>;
export type OrdersRecord = TPartialRow<Schema, 'orders'>;
export type OrdersConditionTree = TConditionTree<Schema, 'orders'>;
export type OrdersFilter = TPaginatedFilter<Schema, 'orders'>;
export type OrdersSortClause = TSortClause<Schema, 'orders'>;
export type OrdersAggregation = TAggregation<Schema, 'orders'>;

export type PgStatStatementsCustomizer = CollectionCustomizer<Schema, 'pg_stat_statements'>;
export type PgStatStatementsRecord = TPartialRow<Schema, 'pg_stat_statements'>;
export type PgStatStatementsConditionTree = TConditionTree<Schema, 'pg_stat_statements'>;
export type PgStatStatementsFilter = TPaginatedFilter<Schema, 'pg_stat_statements'>;
export type PgStatStatementsSortClause = TSortClause<Schema, 'pg_stat_statements'>;
export type PgStatStatementsAggregation = TAggregation<Schema, 'pg_stat_statements'>;

export type PgStatStatementsInfoCustomizer = CollectionCustomizer<Schema, 'pg_stat_statements_info'>;
export type PgStatStatementsInfoRecord = TPartialRow<Schema, 'pg_stat_statements_info'>;
export type PgStatStatementsInfoConditionTree = TConditionTree<Schema, 'pg_stat_statements_info'>;
export type PgStatStatementsInfoFilter = TPaginatedFilter<Schema, 'pg_stat_statements_info'>;
export type PgStatStatementsInfoSortClause = TSortClause<Schema, 'pg_stat_statements_info'>;
export type PgStatStatementsInfoAggregation = TAggregation<Schema, 'pg_stat_statements_info'>;

export type PlansCustomizer = CollectionCustomizer<Schema, 'plans'>;
export type PlansRecord = TPartialRow<Schema, 'plans'>;
export type PlansConditionTree = TConditionTree<Schema, 'plans'>;
export type PlansFilter = TPaginatedFilter<Schema, 'plans'>;
export type PlansSortClause = TSortClause<Schema, 'plans'>;
export type PlansAggregation = TAggregation<Schema, 'plans'>;

export type SubscriptionsCustomizer = CollectionCustomizer<Schema, 'subscriptions'>;
export type SubscriptionsRecord = TPartialRow<Schema, 'subscriptions'>;
export type SubscriptionsConditionTree = TConditionTree<Schema, 'subscriptions'>;
export type SubscriptionsFilter = TPaginatedFilter<Schema, 'subscriptions'>;
export type SubscriptionsSortClause = TSortClause<Schema, 'subscriptions'>;
export type SubscriptionsAggregation = TAggregation<Schema, 'subscriptions'>;

export type TicketsCustomizer = CollectionCustomizer<Schema, 'tickets'>;
export type TicketsRecord = TPartialRow<Schema, 'tickets'>;
export type TicketsConditionTree = TConditionTree<Schema, 'tickets'>;
export type TicketsFilter = TPaginatedFilter<Schema, 'tickets'>;
export type TicketsSortClause = TSortClause<Schema, 'tickets'>;
export type TicketsAggregation = TAggregation<Schema, 'tickets'>;

export type UsersCustomizer = CollectionCustomizer<Schema, 'users'>;
export type UsersRecord = TPartialRow<Schema, 'users'>;
export type UsersConditionTree = TConditionTree<Schema, 'users'>;
export type UsersFilter = TPaginatedFilter<Schema, 'users'>;
export type UsersSortClause = TSortClause<Schema, 'users'>;
export type UsersAggregation = TAggregation<Schema, 'users'>;


export type Schema = {
  'addresses': {
    plain: {
      'city': string | null;
      'country': string | null;
      'id': number;
      'number': string | null;
      'street': string | null;
      'user_id': number | null;
    };
    nested: {
      'user': Schema['users']['plain'] & Schema['users']['nested'];
    };
    flat: {
      'user:birthdate': string | null;
      'user:cellphone': string | null;
      'user:email': string;
      'user:firstname': string | null;
      'user:fullname': string | null;
      'user:id': number;
      'user:identity_picture': string | null;
      'user:is_blocked': boolean | null;
      'user:lastname': string | null;
      'user:password': string;
      'user:signup_date': string | null;
      'user:subscription:id': number;
      'user:subscription:plan_id': number | null;
      'user:subscription:subscription_date': string | null;
      'user:subscription:user_id': number | null;
      'user:subscription:plan:allowed_discount': number | null;
      'user:subscription:plan:allowed_number_of_requests': number | null;
      'user:subscription:plan:dedicated_support': boolean | null;
      'user:subscription:plan:has_access_to_premium': boolean | null;
      'user:subscription:plan:id': number;
      'user:subscription:plan:monthly_cost': number | null;
      'user:subscription:plan:name': string | null;
    };
  };
  'billing_infos': {
    plain: {
      'address': string | null;
      'card_number': string | null;
      'card_owner': string | null;
      'id': number;
      'user_id': number | null;
    };
    nested: {
      'user': Schema['users']['plain'] & Schema['users']['nested'];
    };
    flat: {
      'user:birthdate': string | null;
      'user:cellphone': string | null;
      'user:email': string;
      'user:firstname': string | null;
      'user:fullname': string | null;
      'user:id': number;
      'user:identity_picture': string | null;
      'user:is_blocked': boolean | null;
      'user:lastname': string | null;
      'user:password': string;
      'user:signup_date': string | null;
      'user:subscription:id': number;
      'user:subscription:plan_id': number | null;
      'user:subscription:subscription_date': string | null;
      'user:subscription:user_id': number | null;
      'user:subscription:plan:allowed_discount': number | null;
      'user:subscription:plan:allowed_number_of_requests': number | null;
      'user:subscription:plan:dedicated_support': boolean | null;
      'user:subscription:plan:has_access_to_premium': boolean | null;
      'user:subscription:plan:id': number;
      'user:subscription:plan:monthly_cost': number | null;
      'user:subscription:plan:name': string | null;
    };
  };
  'comments': {
    plain: {
      'comment_from': number | null;
      'date': string | null;
      'id': number;
      'message': string | null;
      'ticket_id': number | null;
    };
    nested: {
      'ticket': Schema['tickets']['plain'] & Schema['tickets']['nested'];
      'user': Schema['users']['plain'] & Schema['users']['nested'];
    };
    flat: {
      'ticket:date': string | null;
      'ticket:id': number;
      'ticket:is_resolved': boolean | null;
      'ticket:opened_by': number | null;
      'ticket:owner': number | null;
      'ticket:priority': 'high' | 'low' | 'medium' | null;
      'ticket:subject': string | null;
      'user:birthdate': string | null;
      'user:cellphone': string | null;
      'user:email': string;
      'user:firstname': string | null;
      'user:fullname': string | null;
      'user:id': number;
      'user:identity_picture': string | null;
      'user:is_blocked': boolean | null;
      'user:lastname': string | null;
      'user:password': string;
      'user:signup_date': string | null;
      'ticket:user_through_opened_by:birthdate': string | null;
      'ticket:user_through_opened_by:cellphone': string | null;
      'ticket:user_through_opened_by:email': string;
      'ticket:user_through_opened_by:firstname': string | null;
      'ticket:user_through_opened_by:fullname': string | null;
      'ticket:user_through_opened_by:id': number;
      'ticket:user_through_opened_by:identity_picture': string | null;
      'ticket:user_through_opened_by:is_blocked': boolean | null;
      'ticket:user_through_opened_by:lastname': string | null;
      'ticket:user_through_opened_by:password': string;
      'ticket:user_through_opened_by:signup_date': string | null;
      'ticket:user_through_owner:birthdate': string | null;
      'ticket:user_through_owner:cellphone': string | null;
      'ticket:user_through_owner:email': string;
      'ticket:user_through_owner:firstname': string | null;
      'ticket:user_through_owner:fullname': string | null;
      'ticket:user_through_owner:id': number;
      'ticket:user_through_owner:identity_picture': string | null;
      'ticket:user_through_owner:is_blocked': boolean | null;
      'ticket:user_through_owner:lastname': string | null;
      'ticket:user_through_owner:password': string;
      'ticket:user_through_owner:signup_date': string | null;
      'user:subscription:id': number;
      'user:subscription:plan_id': number | null;
      'user:subscription:subscription_date': string | null;
      'user:subscription:user_id': number | null;
      'ticket:user_through_opened_by:subscription:id': number;
      'ticket:user_through_opened_by:subscription:plan_id': number | null;
      'ticket:user_through_opened_by:subscription:subscription_date': string | null;
      'ticket:user_through_opened_by:subscription:user_id': number | null;
      'ticket:user_through_owner:subscription:id': number;
      'ticket:user_through_owner:subscription:plan_id': number | null;
      'ticket:user_through_owner:subscription:subscription_date': string | null;
      'ticket:user_through_owner:subscription:user_id': number | null;
      'user:subscription:plan:allowed_discount': number | null;
      'user:subscription:plan:allowed_number_of_requests': number | null;
      'user:subscription:plan:dedicated_support': boolean | null;
      'user:subscription:plan:has_access_to_premium': boolean | null;
      'user:subscription:plan:id': number;
      'user:subscription:plan:monthly_cost': number | null;
      'user:subscription:plan:name': string | null;
      'ticket:user_through_opened_by:subscription:plan:allowed_discount': number | null;
      'ticket:user_through_opened_by:subscription:plan:allowed_number_of_requests': number | null;
      'ticket:user_through_opened_by:subscription:plan:dedicated_support': boolean | null;
      'ticket:user_through_opened_by:subscription:plan:has_access_to_premium': boolean | null;
      'ticket:user_through_opened_by:subscription:plan:id': number;
      'ticket:user_through_opened_by:subscription:plan:monthly_cost': number | null;
      'ticket:user_through_opened_by:subscription:plan:name': string | null;
      'ticket:user_through_owner:subscription:plan:allowed_discount': number | null;
      'ticket:user_through_owner:subscription:plan:allowed_number_of_requests': number | null;
      'ticket:user_through_owner:subscription:plan:dedicated_support': boolean | null;
      'ticket:user_through_owner:subscription:plan:has_access_to_premium': boolean | null;
      'ticket:user_through_owner:subscription:plan:id': number;
      'ticket:user_through_owner:subscription:plan:monthly_cost': number | null;
      'ticket:user_through_owner:subscription:plan:name': string | null;
    };
  };
  'coupons': {
    plain: {
      'discount_amount': number | null;
      'discount_percent': number | null;
      'id': number;
      'name': string | null;
      'used_in_x_orders': number | null;
      'user_id': number | null;
    };
    nested: {
      'user': Schema['users']['plain'] & Schema['users']['nested'];
    };
    flat: {
      'user:birthdate': string | null;
      'user:cellphone': string | null;
      'user:email': string;
      'user:firstname': string | null;
      'user:fullname': string | null;
      'user:id': number;
      'user:identity_picture': string | null;
      'user:is_blocked': boolean | null;
      'user:lastname': string | null;
      'user:password': string;
      'user:signup_date': string | null;
      'user:subscription:id': number;
      'user:subscription:plan_id': number | null;
      'user:subscription:subscription_date': string | null;
      'user:subscription:user_id': number | null;
      'user:subscription:plan:allowed_discount': number | null;
      'user:subscription:plan:allowed_number_of_requests': number | null;
      'user:subscription:plan:dedicated_support': boolean | null;
      'user:subscription:plan:has_access_to_premium': boolean | null;
      'user:subscription:plan:id': number;
      'user:subscription:plan:monthly_cost': number | null;
      'user:subscription:plan:name': string | null;
    };
  };
  'messages': {
    plain: {
      'date': string | null;
      'id': number;
      'message': string | null;
      'receiver': number | null;
      'sender': number | null;
    };
    nested: {
      'user_through_receiver': Schema['users']['plain'] & Schema['users']['nested'];
      'user_through_sender': Schema['users']['plain'] & Schema['users']['nested'];
    };
    flat: {
      'user_through_receiver:birthdate': string | null;
      'user_through_receiver:cellphone': string | null;
      'user_through_receiver:email': string;
      'user_through_receiver:firstname': string | null;
      'user_through_receiver:fullname': string | null;
      'user_through_receiver:id': number;
      'user_through_receiver:identity_picture': string | null;
      'user_through_receiver:is_blocked': boolean | null;
      'user_through_receiver:lastname': string | null;
      'user_through_receiver:password': string;
      'user_through_receiver:signup_date': string | null;
      'user_through_sender:birthdate': string | null;
      'user_through_sender:cellphone': string | null;
      'user_through_sender:email': string;
      'user_through_sender:firstname': string | null;
      'user_through_sender:fullname': string | null;
      'user_through_sender:id': number;
      'user_through_sender:identity_picture': string | null;
      'user_through_sender:is_blocked': boolean | null;
      'user_through_sender:lastname': string | null;
      'user_through_sender:password': string;
      'user_through_sender:signup_date': string | null;
      'user_through_receiver:subscription:id': number;
      'user_through_receiver:subscription:plan_id': number | null;
      'user_through_receiver:subscription:subscription_date': string | null;
      'user_through_receiver:subscription:user_id': number | null;
      'user_through_sender:subscription:id': number;
      'user_through_sender:subscription:plan_id': number | null;
      'user_through_sender:subscription:subscription_date': string | null;
      'user_through_sender:subscription:user_id': number | null;
      'user_through_receiver:subscription:plan:allowed_discount': number | null;
      'user_through_receiver:subscription:plan:allowed_number_of_requests': number | null;
      'user_through_receiver:subscription:plan:dedicated_support': boolean | null;
      'user_through_receiver:subscription:plan:has_access_to_premium': boolean | null;
      'user_through_receiver:subscription:plan:id': number;
      'user_through_receiver:subscription:plan:monthly_cost': number | null;
      'user_through_receiver:subscription:plan:name': string | null;
      'user_through_sender:subscription:plan:allowed_discount': number | null;
      'user_through_sender:subscription:plan:allowed_number_of_requests': number | null;
      'user_through_sender:subscription:plan:dedicated_support': boolean | null;
      'user_through_sender:subscription:plan:has_access_to_premium': boolean | null;
      'user_through_sender:subscription:plan:id': number;
      'user_through_sender:subscription:plan:monthly_cost': number | null;
      'user_through_sender:subscription:plan:name': string | null;
    };
  };
  'orders': {
    plain: {
      'amount_with_discount': number | null;
      'coupon_id': number | null;
      'date': string | null;
      'id': number;
      'initial_amount': number | null;
      'paid': boolean | null;
      'pay_date': string | null;
      'user_id': number | null;
    };
    nested: {
      'coupon': Schema['coupons']['plain'] & Schema['coupons']['nested'];
      'user': Schema['users']['plain'] & Schema['users']['nested'];
    };
    flat: {
      'coupon:discount_amount': number | null;
      'coupon:discount_percent': number | null;
      'coupon:id': number;
      'coupon:name': string | null;
      'coupon:used_in_x_orders': number | null;
      'coupon:user_id': number | null;
      'user:birthdate': string | null;
      'user:cellphone': string | null;
      'user:email': string;
      'user:firstname': string | null;
      'user:fullname': string | null;
      'user:id': number;
      'user:identity_picture': string | null;
      'user:is_blocked': boolean | null;
      'user:lastname': string | null;
      'user:password': string;
      'user:signup_date': string | null;
      'coupon:user:birthdate': string | null;
      'coupon:user:cellphone': string | null;
      'coupon:user:email': string;
      'coupon:user:firstname': string | null;
      'coupon:user:fullname': string | null;
      'coupon:user:id': number;
      'coupon:user:identity_picture': string | null;
      'coupon:user:is_blocked': boolean | null;
      'coupon:user:lastname': string | null;
      'coupon:user:password': string;
      'coupon:user:signup_date': string | null;
      'user:subscription:id': number;
      'user:subscription:plan_id': number | null;
      'user:subscription:subscription_date': string | null;
      'user:subscription:user_id': number | null;
      'coupon:user:subscription:id': number;
      'coupon:user:subscription:plan_id': number | null;
      'coupon:user:subscription:subscription_date': string | null;
      'coupon:user:subscription:user_id': number | null;
      'user:subscription:plan:allowed_discount': number | null;
      'user:subscription:plan:allowed_number_of_requests': number | null;
      'user:subscription:plan:dedicated_support': boolean | null;
      'user:subscription:plan:has_access_to_premium': boolean | null;
      'user:subscription:plan:id': number;
      'user:subscription:plan:monthly_cost': number | null;
      'user:subscription:plan:name': string | null;
      'coupon:user:subscription:plan:allowed_discount': number | null;
      'coupon:user:subscription:plan:allowed_number_of_requests': number | null;
      'coupon:user:subscription:plan:dedicated_support': boolean | null;
      'coupon:user:subscription:plan:has_access_to_premium': boolean | null;
      'coupon:user:subscription:plan:id': number;
      'coupon:user:subscription:plan:monthly_cost': number | null;
      'coupon:user:subscription:plan:name': string | null;
    };
  };
  'pg_stat_statements': {
    plain: {
      'blk_read_time': number | null;
      'blk_write_time': number | null;
      'calls': number | null;
      'jit_emission_count': number | null;
      'jit_emission_time': number | null;
      'jit_functions': number | null;
      'jit_generation_time': number | null;
      'jit_inlining_count': number | null;
      'jit_inlining_time': number | null;
      'jit_optimization_count': number | null;
      'jit_optimization_time': number | null;
      'local_blks_dirtied': number | null;
      'local_blks_hit': number | null;
      'local_blks_read': number | null;
      'local_blks_written': number | null;
      'max_exec_time': number | null;
      'max_plan_time': number | null;
      'mean_exec_time': number | null;
      'mean_plan_time': number | null;
      'min_exec_time': number | null;
      'min_plan_time': number | null;
      'plans': number | null;
      'query': string | null;
      'queryid': number | null;
      'rows': number | null;
      'shared_blks_dirtied': number | null;
      'shared_blks_hit': number | null;
      'shared_blks_read': number | null;
      'shared_blks_written': number | null;
      'stddev_exec_time': number | null;
      'stddev_plan_time': number | null;
      'temp_blk_read_time': number | null;
      'temp_blk_write_time': number | null;
      'temp_blks_read': number | null;
      'temp_blks_written': number | null;
      'toplevel': boolean;
      'total_exec_time': number | null;
      'total_plan_time': number | null;
      'wal_bytes': number | null;
      'wal_fpi': number | null;
      'wal_records': number | null;
    };
    nested: {};
    flat: {};
  };
  'pg_stat_statements_info': {
    plain: {
      'dealloc': number;
      'stats_reset': string | null;
    };
    nested: {};
    flat: {};
  };
  'plans': {
    plain: {
      'allowed_discount': number | null;
      'allowed_number_of_requests': number | null;
      'dedicated_support': boolean | null;
      'has_access_to_premium': boolean | null;
      'id': number;
      'monthly_cost': number | null;
      'name': string | null;
    };
    nested: {};
    flat: {};
  };
  'subscriptions': {
    plain: {
      'id': number;
      'plan_id': number | null;
      'subscription_date': string | null;
      'user_id': number | null;
    };
    nested: {
      'plan': Schema['plans']['plain'] & Schema['plans']['nested'];
      'user': Schema['users']['plain'] & Schema['users']['nested'];
    };
    flat: {
      'plan:allowed_discount': number | null;
      'plan:allowed_number_of_requests': number | null;
      'plan:dedicated_support': boolean | null;
      'plan:has_access_to_premium': boolean | null;
      'plan:id': number;
      'plan:monthly_cost': number | null;
      'plan:name': string | null;
      'user:birthdate': string | null;
      'user:cellphone': string | null;
      'user:email': string;
      'user:firstname': string | null;
      'user:fullname': string | null;
      'user:id': number;
      'user:identity_picture': string | null;
      'user:is_blocked': boolean | null;
      'user:lastname': string | null;
      'user:password': string;
      'user:signup_date': string | null;
    };
  };
  'tickets': {
    plain: {
      'date': string | null;
      'id': number;
      'is_resolved': boolean | null;
      'opened_by': number | null;
      'owner': number | null;
      'priority': 'high' | 'low' | 'medium' | null;
      'subject': string | null;
    };
    nested: {
      'user_through_opened_by': Schema['users']['plain'] & Schema['users']['nested'];
      'user_through_owner': Schema['users']['plain'] & Schema['users']['nested'];
    };
    flat: {
      'user_through_opened_by:birthdate': string | null;
      'user_through_opened_by:cellphone': string | null;
      'user_through_opened_by:email': string;
      'user_through_opened_by:firstname': string | null;
      'user_through_opened_by:fullname': string | null;
      'user_through_opened_by:id': number;
      'user_through_opened_by:identity_picture': string | null;
      'user_through_opened_by:is_blocked': boolean | null;
      'user_through_opened_by:lastname': string | null;
      'user_through_opened_by:password': string;
      'user_through_opened_by:signup_date': string | null;
      'user_through_owner:birthdate': string | null;
      'user_through_owner:cellphone': string | null;
      'user_through_owner:email': string;
      'user_through_owner:firstname': string | null;
      'user_through_owner:fullname': string | null;
      'user_through_owner:id': number;
      'user_through_owner:identity_picture': string | null;
      'user_through_owner:is_blocked': boolean | null;
      'user_through_owner:lastname': string | null;
      'user_through_owner:password': string;
      'user_through_owner:signup_date': string | null;
      'user_through_opened_by:subscription:id': number;
      'user_through_opened_by:subscription:plan_id': number | null;
      'user_through_opened_by:subscription:subscription_date': string | null;
      'user_through_opened_by:subscription:user_id': number | null;
      'user_through_owner:subscription:id': number;
      'user_through_owner:subscription:plan_id': number | null;
      'user_through_owner:subscription:subscription_date': string | null;
      'user_through_owner:subscription:user_id': number | null;
      'user_through_opened_by:subscription:plan:allowed_discount': number | null;
      'user_through_opened_by:subscription:plan:allowed_number_of_requests': number | null;
      'user_through_opened_by:subscription:plan:dedicated_support': boolean | null;
      'user_through_opened_by:subscription:plan:has_access_to_premium': boolean | null;
      'user_through_opened_by:subscription:plan:id': number;
      'user_through_opened_by:subscription:plan:monthly_cost': number | null;
      'user_through_opened_by:subscription:plan:name': string | null;
      'user_through_owner:subscription:plan:allowed_discount': number | null;
      'user_through_owner:subscription:plan:allowed_number_of_requests': number | null;
      'user_through_owner:subscription:plan:dedicated_support': boolean | null;
      'user_through_owner:subscription:plan:has_access_to_premium': boolean | null;
      'user_through_owner:subscription:plan:id': number;
      'user_through_owner:subscription:plan:monthly_cost': number | null;
      'user_through_owner:subscription:plan:name': string | null;
    };
  };
  'users': {
    plain: {
      'birthdate': string | null;
      'cellphone': string | null;
      'email': string;
      'firstname': string | null;
      'fullname': string | null;
      'id': number;
      'identity_picture': string | null;
      'is_blocked': boolean | null;
      'lastname': string | null;
      'password': string;
      'signup_date': string | null;
    };
    nested: {
      'subscription': Schema['subscriptions']['plain'] & Schema['subscriptions']['nested'];
    };
    flat: {
      'subscription:id': number;
      'subscription:plan_id': number | null;
      'subscription:subscription_date': string | null;
      'subscription:user_id': number | null;
      'subscription:plan:allowed_discount': number | null;
      'subscription:plan:allowed_number_of_requests': number | null;
      'subscription:plan:dedicated_support': boolean | null;
      'subscription:plan:has_access_to_premium': boolean | null;
      'subscription:plan:id': number;
      'subscription:plan:monthly_cost': number | null;
      'subscription:plan:name': string | null;
    };
  };
};
