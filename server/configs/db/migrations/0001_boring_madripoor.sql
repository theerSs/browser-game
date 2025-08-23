CREATE TABLE `character` (
	`id` text PRIMARY KEY NOT NULL,
	`image` text NOT NULL,
	`name` text NOT NULL,
	`level` integer NOT NULL,
	`stats` text NOT NULL,
	`resources` text NOT NULL,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `inventory` (
	`character_id` text PRIMARY KEY NOT NULL,
	`gold` integer NOT NULL,
	`potions` text NOT NULL,
	FOREIGN KEY (`character_id`) REFERENCES `character`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `inventory_item` (
	`id` text PRIMARY KEY NOT NULL,
	`character_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`amount` integer NOT NULL,
	FOREIGN KEY (`character_id`) REFERENCES `character`(`id`) ON UPDATE no action ON DELETE cascade
);
