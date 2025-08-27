PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_character` (
	`id` text PRIMARY KEY DEFAULT 'd4d5f8a0-8f3b-4217-a9df-85bfa85c1032' NOT NULL,
	`image` text DEFAULT 'player' NOT NULL,
	`name` text NOT NULL,
	`level` integer DEFAULT 1 NOT NULL,
	`experience` text DEFAULT '{"current":0,"toLevelUp":100}' NOT NULL,
	`stats` text DEFAULT '{"damage":[5,9],"defence":3,"dex":4}' NOT NULL,
	`resources` text DEFAULT '{"energy":{"current":15,"max":15},"health":{"current":30,"max":30}}' NOT NULL,
	`inventory` text DEFAULT '{"potions":{"health":{"name":"health_potion","amount":2,"healAmount":0.2},"energy":{"name":"energy_potion","amount":2,"healAmount":0.1}},"gold":0,"items":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}' NOT NULL,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_character`("id", "image", "name", "level", "experience", "stats", "resources", "inventory", "user_id") SELECT "id", "image", "name", "level", "experience", "stats", "resources", "inventory", "user_id" FROM `character`;--> statement-breakpoint
DROP TABLE `character`;--> statement-breakpoint
ALTER TABLE `__new_character` RENAME TO `character`;--> statement-breakpoint
PRAGMA foreign_keys=ON;