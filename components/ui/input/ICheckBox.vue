<template>
	<v-checkbox
		v-model="internalValue"
		:disabled="disabled"
		@change="onChange"
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
		<template #message>
			<slot name="message" />
		</template>
	</v-checkbox>
</template>

<script lang="ts">
	import Vue from "vue"
	import { Component, Emit, Prop, Watch } from "vue-property-decorator"

	import { HTMLEvent } from "../../../utils/Events"

	@Component
	export default class ICheckBox extends Vue {
		@Prop({ type: Boolean, default: false }) value!: boolean
		@Prop({ type: Boolean, default: false }) disabled!: boolean

		internalValue = false

		@Watch("value", { immediate: true })
		valueChanged(): void {
			this.internalValue = this.value
		}

		@Emit(HTMLEvent.INPUT)
		@Emit(HTMLEvent.CHANGE)
		onChange(): boolean {
			return this.internalValue
		}
	}
</script>

<style scoped>

</style>
