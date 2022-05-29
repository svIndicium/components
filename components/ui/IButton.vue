<template>
	<v-btn
		:disabled="disabled"
		:loading="loading"
		:outlined="!isPrimary"
		@click="onClick"
	>
		<slot />
	</v-btn>
</template>

<script lang="ts">
	import Vue from "vue"
	import { Component, Emit, Prop } from "vue-property-decorator"

	import { HTMLEvent } from "../../utils/Events"

	@Component
	export default class IButton extends Vue {
		@Prop({ type: Boolean, default: false }) disabled!: boolean
		@Prop({ type: Boolean, default: false }) loading!: boolean
		@Prop({ type: Boolean, default: false }) primary!: boolean
		@Prop({ type: Boolean, default: false }) secondary!: boolean

		get isPrimary(): boolean {
			return this.primary || (!this.primary && this.secondary)
		}

		@Emit(HTMLEvent.CLICK)
		onClick(): void {
		}
	}
</script>

<style scoped>

</style>
