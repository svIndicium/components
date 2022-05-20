<template>
	<div
		:class="[inline ? 'inline' : '']"
	>
		<v-text-field
			v-model="internalValue"
			:placeholder="placeholder"
			@change="onChange"
			@input="onInput"
			@blur="onBlur"
		>
			<template #label><slot name="label"></slot></template>
			<template #append><slot name="append"></slot></template>
			<template #prepend><slot name="prepend"></slot></template>
		</v-text-field>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import { Component, Emit, Prop, Watch } from "vue-property-decorator";

	import {HTMLEvent } from "utils/Events";

	@Component
	export default class ITextInput extends Vue {
		@Prop({ type: String, required: false }) placeholder?: string

		@Prop({ type: Boolean, required: false }) inline?: boolean

		@Prop({ type: String, required: true }) value!: string

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

