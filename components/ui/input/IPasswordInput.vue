<template>
	<i-text-input
		v-model="internalValue"
		:placeholder="placeholder"
		:loading="loading"
		:disabled="disabled"
		:errors="errors"
		:base-translation-key="baseTranslationKey"
		:field-name="fieldName"
		:generic-messages="genericMessages"
		:show-errors="showErrors"
		password
		@change="onChange"
		@input="onInput"
		@blur="onBlur"
	>
		<template #default>
			<slot />
		</template>
		<template #append>
			<slot name="append" />
		</template>
		<template #prepend>
			<slot name="prepend" />
		</template>
	</i-text-input>
</template>

<script lang="ts">
	import Vue from "vue"
	import { Component, Emit, Prop, Watch } from "vue-property-decorator"

	import { FieldErrors } from "@svindicium/general-lib/validation"

	import ITextInput from "../../../components/ui/input/ITextInput.vue"
	import { HTMLEvent } from "../../../utils/Events"

	@Component({
		components: { ITextInput }
	})
	export default class IPasswordInput extends Vue {
		@Prop({ type: String, required: false }) placeholder?: string
		@Prop({ type: Boolean, required: false }) inline?: boolean
		@Prop({ type: Boolean, required: false }) loading?: boolean
		@Prop({ type: Boolean, required: false }) disabled?: boolean
		@Prop({ type: String, required: true }) value!: string

		@Prop({ type: Object, required: false }) errors?: FieldErrors
		@Prop({ type: String, default: "validation" }) baseTranslationKey!: string
		@Prop({ type: String, required: false }) fieldName?: string
		@Prop({ type: Array, default: () => ["required"] }) genericMessages!: Array<string>
		@Prop({ type: Boolean, default: false }) showErrors!: boolean

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
