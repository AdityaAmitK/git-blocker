export interface Rule {
	pattern: string;
	reason?: string;
  }
  
  export interface Config {
	rules: Rule[];
  }
  
  export type Match = {
	rule: Rule;
	file: string;
  };