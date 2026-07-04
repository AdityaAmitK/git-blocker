export interface Rule {
	pattern: string;
	reason?: string;
  }
  
  export interface Config {
	rules: Rule[];
  }
  