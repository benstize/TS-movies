
  
  export interface Movie {
    backdrop_path: string;
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;

  }
  
  export interface ApiResponse {
    results: Movie[];
    page: number;
    total_results: number;
    total_pages: number;
}