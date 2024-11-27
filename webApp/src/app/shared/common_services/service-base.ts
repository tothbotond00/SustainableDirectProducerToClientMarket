import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class ServiceBase<T> {

    protected baseUrl: string;

    constructor(protected http: HttpClient, protected apiUrl: string, private controller: string) {
        this.baseUrl = apiUrl + controller;
    }

    public get(endpoint: string = "", 
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> })
    : Observable<T[]> {

        return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`, {params});
    }

    public getOne(endpoint: string = "", 
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> })
    : Observable<T> {

        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json'
            }, params 
        });
    }

    getImage(endpoint: string = "", params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> })
    : Observable<Blob> {
        return this.http.get<Blob>(`${this.baseUrl}/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: 'blob' as 'json',
            params, 
        });
    }

    public put(endpoint: string, data: T | any, params?: any): Observable<string> {
        return this.http.put(`${this.baseUrl}/${endpoint}`, data, {
            observe: 'body',
            responseType: 'text',
            params: params
        });
    }

    public post(endpoint: string, data: T | any, params?: any): Observable<string> {
        return this.http.post(`${this.baseUrl}/${endpoint}`, data, {
            observe: 'body',
            responseType: 'text',
            params: params
        });
    }

    public delete(endpoint:string, id: number): Observable<string> {
        if (endpoint != '') endpoint += '/';
        return this.http.delete(`${this.baseUrl}/${endpoint}${id}`, {
            observe: 'body',
            responseType: 'text',
        });
    }
}