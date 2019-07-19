export default class UserModel {
	id = "";

	coins = 0;

	mode = "";

	name = "";

	totalSecondsUsed = 0;

	picture = "";


	constructor(data) {
        this.id = data.id;
        this.coins = data.coins;
        this.mode = data.mode;
        this.name = data.name;
        this.totalSecondsUsed = data.totalSecondsUsed;
        this.picture = data.picture;
	}
}