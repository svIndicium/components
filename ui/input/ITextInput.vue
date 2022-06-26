<template>
	<div
		:class="[inline ? 'inline' : '']"
	>
		<v-text-field
			v-model="internalValue"
			:placeholder="placeholder"
			:type="password ? 'password' : 'text'"
			:loading="loading"
			:disabled="disabled"
			:readonly="readonly"
			:error-messages="errorMessages"
			@change="onChange"
			@input="onInput"
			@blur="onBlur"
		>
			<template #label>
				<slot />
			</template>
			<template #append>
				<slot name="append" />
			</template>
			<template #prepend>
				<slot name="prepend" />
			</template>
		</v-text-field>
	</div>
</template>

<script lang="ts">
	import Vue from "vue"
	import { Component, Emit, Prop, Watch } from "vue-property-decorator"

	import { ObjectErrors } from "@svindicium/lib/validation"

	import { isNull, isUndefined } from "lodash-es"

	import { HTMLEvent } from "../../utils/Events"

	@Component
	export default class ITextInput<T> extends Vue {
		@Prop({ type: String, default: "" }) value!: string

		@Prop({ type: String, required: false }) placeholder?: string
		@Prop({ type: Boolean, required: false }) inline?: boolean
		@Prop({ type: Boolean, required: false }) loading?: boolean
		@Prop({ type: Boolean, required: false }) disabled?: boolean
		@Prop({ type: Boolean, required: false }) password?: boolean
		@Prop({ type: Boolean, required: false }) readonly?: boolean

		@Prop({ type: Object, required: false }) errors?: ObjectErrors<T>
		@Prop({ type: String, default: "validation" }) baseTranslationKey!: string
		@Prop({ type: String, required: false }) fieldName!: keyof T
		@Prop({ type: Array, default: () => ["required"] }) genericMessages!: Array<string>
		@Prop({ type: Boolean, default: false }) showErrors!: boolean

		get errorMessages(): Array<string> | undefined {
			if (isUndefined(this.fieldName) || isUndefined(this.errors) || isNull(this.errors) || !this.showErrors) {
				return
			}
			return this.errors[this.fieldName]?.map((error) => {
				if (!this.genericMessages.includes(error)) {
					return Vue.filter("locale")(`${ this.baseTranslationKey }.${ String(this.fieldName) }.${ error }`)
				}
				return Vue.filter("locale")(`${ this.baseTranslationKey }.${ error }`)
			})
		}

		internalValue = ""

		@Watch("value", { immediate: true })
		valueChanged(newValue: string): void {
			this.internalValue = newValue
		}

		@Emit(HTMLEvent.CHANGE)
		onChange(): string {
			return this.internalValue
		}

		@Emit(HTMLEvent.INPUT)
		onInput(): string {
			return this.internalValue
		}

		@Emit(HTMLEvent.BLUR)
		onBlur(event: Event): Event {
			return event
		}
	}
</script>

<style lang="scss" scoped>
	div {
		display: block;
		position: relative;
		margin: 10px 0;
		.inline {
			width: 180px;
			float: left;
			margin: 0 10px 10px 0;
		}
	}
</style>
