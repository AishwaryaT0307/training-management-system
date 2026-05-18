import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl="http://localhost:5000/api";
  private http=inject(HttpClient);
  
  register(user:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/register`,user);
  }

  login(user:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,user,{withCredentials:true});
  }

  getUserProfile():Observable<any>{
    return this.http.get(`${this.baseUrl}/home`,{withCredentials:true});
  }

  logout():Observable<any>{
    return this.http.post(`${this.baseUrl}/logout`,{}, {withCredentials:true});
  }

  checkRole():Observable<any>{
    return this.http.get(`${this.baseUrl}/check`,{withCredentials:true});
  }

  getNoRoleUsers():Observable<any>{
    return this.http.get(`${this.baseUrl}/getNoRoleUsers`,{withCredentials:true});
}

  updateRole(userId:string, role:string):Observable<any>{
    return this.http.patch(`${this.baseUrl}/updateRole`,{userId,role}, {withCredentials:true});
  }

  getAllMentees(){
    return this.http.get(`${this.baseUrl}/mentees`,{withCredentials:true});
  }

  assignTechStack(userId:string, techStack:string){
    return this.http.patch(`${this.baseUrl}/assignTechStack`,{userId,techstack:techStack}, {withCredentials:true});
  }

  getMentors(){
    return this.http.get(`${this.baseUrl}/mentors`,{withCredentials:true});
  }

  assignMentor(menteeId:string, mentorId:string){
    return this.http.patch(`${this.baseUrl}/assignMentors`,{menteeId, mentorId}, {withCredentials:true});
  }

  getMentorMentees(mentorId:string){
    return this.http.get(`${this.baseUrl}/mentorMentees`,{params:{mentorId}, withCredentials:true});
  }

}
