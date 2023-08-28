import { CollectionCustomizer } from "@forestadmin/agent";
import { Schema } from "../typings";

export default (orders: CollectionCustomizer<Schema, 'orders'>) => {
  orders
    .addAction('Apply a coupon', {
      scope: 'Single',
      form: [{
        label: 'Coupon',
        type: 'Collection',
        collectionName: 'coupons',
      }],
      execute: async (context, resultBuilder) => {
        try {
          const [couponId] = context.formValues['Coupon'];
          await context.collection.update({ conditionTree: { field: 'id', operator: 'Equal', value: await context.getRecordId() } }, { coupon_id: couponId });
          return resultBuilder.success(`Successfully applied coupon`, { invalidated: ['coupon']});
        } catch (error) {
          return resultBuilder.error(`Failed to apply coupon: ${error.message}.`);
        }
      }
    })
    .addField('amount_with_discount', {
      columnType: 'Number',
      dependencies: ['coupon:discount_percent', 'coupon:discount_amount', 'initial_amount'],
      getValues: (records) => {
        return records.map((record) => {
          const discountPercent = Number(record.coupon?.discount_percent || 0);
          const discountAmount = Number(record.coupon?.discount_amount || 0);
          const initialAmount = record['initial_amount'];
          const amountWithDiscount = initialAmount - (initialAmount * (discountPercent / 100)) - discountAmount;
          console.log(discountPercent, discountAmount, initialAmount, amountWithDiscount, record);
          return Math.floor((amountWithDiscount > 0 ? amountWithDiscount : 0)*100)/100;
        });
      }
    });
};