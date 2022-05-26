<template>
	<v-alert
		border="bottom"
		elevation="2"
		:type="alertType"
	>
		<slot />
	</v-alert>
</template>

<script lang="ts">
	import Vue from "vue"
	import Component from "vue-class-component"
	import { Prop } from "vue-property-decorator"
	import { AlertType } from "../../components/ui/index"

	@Component
	export default class IAlert extends Vue {
		@Prop({ type: String, default: AlertType.INFO }) type!: AlertType

		get alertType(): string {
			return this.type.toLowerCase()
		}
	}
</script>

<style lang="scss" scoped>

</style>
