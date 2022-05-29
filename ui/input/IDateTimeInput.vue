<template>
	<v-row>
		<v-col>
			<v-text-field
				v-model="internalDateValue"
				:placeholder="placeholder"
				:loading="loading"
				:disabled="disabled"
				:readonly="readonly"
				:error-messages="errorMessages"
				type="date"
				@input="emitWhenDone"
				@blur="onBlur"
			>
				<template #label>
					<slot />
				</template>
			</v-text-field>
		</v-col>
		<v-col>
			<v-text-field
				v-model="internalTimeValue"
				:loading="loading"
				:disabled="disabled"
				:readonly="readonly"
				type="time"
				@input="emitWhenDone"
				@blur="onBlur"
			/>
		</v-col>
	</v-row>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { Emit, Prop, Watch } from "vue-property-decorator"

	import { ObjectErrors } from "@svindicium/lib/validation"

	import { isDate, isEmpty, isNull, isUndefined } from "lodash-es"

	import ITextInput from "../../ui/input/ITextInput.vue"
	import { HTMLEvent } from "../../utils/Events"

	@Component({
		components: {
			ITextInput
		}
	})
	export default class IDateTimeInput<T> extends Vue {
		@Prop({ type: Date, default: () => {} }) value!: Date

		@Prop({ type: String, required: false }) placeholder?: string
		@Prop({ type: Boolean, required: false }) loading?: boolean
		@Prop({ type: Boolean, required: false }) disabled?: boolean
		@Prop({ type: Boolean, required: false }) readonly?: boolean

		@Prop({ type: Object, required: false }) errors?: ObjectErrors<T>
		@Prop({ type: String, default: "validation" }) baseTranslationKey!: string
		@Prop({ type: String, required: false }) fieldName!: keyof T
		@Prop({ type: Array, default: () => ["required"] }) genericMessages!: Array<string>
		@Prop({ type: Boolean, default: false }) showErrors!: boolean

		internalTimeValue = ""
		internalDateValue = ""

		get date(): Date | undefined {
			if (isEmpty(this.internalDateValue) || isEmpty(this.internalTimeValue)) {
				return
			}
			const [year, month, day] = this.internalDateValue.split("-").map(item => parseInt(item))
			const [hours, minutes] = this.internalTimeValue.split(":").map(item => parseInt(item))
			return new Date(year, month - 1, day, hours, minutes)
		}

		get errorMessages(): Array<string> | undefined {
			if (isUndefined(this.fieldName) || isUndefined(this.errors) || isNull(this.errors) || !this.showErrors) {
				return
			}
			return this.errors[this.fieldName]?.map((error) => {
				if (!this.genericMessages.includes(error)) {
					return Vue.filter("locale")(`${ this.baseTranslationKey }.${ this.fieldName }.${ error }`)
				}
				return Vue.filter("locale")(`${ this.baseTranslationKey }.${ error }`)
			})
		}

		@Watch("value", { immediate: true })
		valueChanged(): void {
			if (isUndefined(this.value) && !isDate(this.value)) {
				this.internalDateValue = ""
				this.internalTimeValue = ""
				return
			}
			this.internalDateValue = `${ this.value.getUTCFullYear() }-${ (this.value.getMonth() + 1).toString().length === 1 ? "0" : "" }${ this.value.getMonth() + 1 }-${ (this.value.getDate() + 1).toString().length === 1 ? "0" : "" }${ this.value.getDate() }`
			this.internalTimeValue = `${ (this.value.getHours() + 1).toString().length === 1 ? "0" : "" }${ this.value.getHours() }:${ (this.value.getMinutes() + 1).toString().length === 1 ? "0" : "" }${ this.value.getMinutes() }`
		}

		emitWhenDone(): void {
			 if (/[1-9]\d{3}-\d{2}-\d{2}/.test(this.internalDateValue) && /\d{2}:\d{2}/.test(this.internalTimeValue)) {
				 this.onInput()
			 }
		}

		@Emit(HTMLEvent.INPUT)
		@Emit(HTMLEvent.CHANGE)
		onInput(): Date | undefined {
			return this.date
		}

		@Emit(HTMLEvent.BLUR)
		onBlur(event: Event): Event {
			return event
		}
	}
</script>

<style lang="scss" scoped>

</style>
