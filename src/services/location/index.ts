export type Coordinates = {
	latitude: number;
	longitude: number;
	accuracy?: number;
};

export async function getCurrentLocation(): Promise<Coordinates | null> {
	return null;
}
