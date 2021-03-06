/*
 * The current cart.
 */
exports.definition = {
	config: {
		defaults: {
			total: 0.0
		}
	},
	// TODO: Move to ES6, solve "this" scope
	extendModel: function (Model) {
		Object.assign(Model.prototype, {
			castNumber: function (value) {
				return Number(value.replace(/,/g, '.')).toFixed(2);
			},
			increment: function (value) {
				this.set('total', +this.get('total') + +this.castNumber(value));
				this.trigger('update', this.getFormattedTotal());
			},
			decrement: function (value) {
				this.set('total', +this.get('total') - +this.castNumber(value));
				this.trigger('update', this.getFormattedTotal());
			},
			resetTotal: function (triggerReset) {
				this.set('total', 0.0);
				this.trigger('update', this.getFormattedTotal());
				triggerReset && this.trigger('reset');
			},
			getTotal: function () {
				return this.get('total');
			},
			getFormattedTotal: function () {
				const val = this.get('total').toFixed(2);
				if (val === 0) {
					return '0,00 €';
				}
				return String(val).replace('.', ',') + ' €';
			}
		});

		return Model;
	},
	extendCollection: Collection => {
		return Collection;
	}
};
