"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[741],{52940:function(e,r){r.Z="http://localhost:8010"},80611:function(e,r,t){t.d(r,{Lf:function(){return l},M3:function(){return d},SL:function(){return f},pr:function(){return h},qF:function(){return c}});var n=t(92800),a=t(81631),o=t(52940),i=t(7938),u=t(629);let l=(0,n.LC)({reducerPath:"mantis",baseQuery:(0,a.ni)({baseUrl:o.Z,prepareHeaders:(e,r)=>{let{getState:t}=r;return(0,i.Z)(e,t)}}),endpoints:e=>({runModel:e.mutation({query:e=>(console.log("run model query",{name:"03.03.541",description:e.description,water_content:e.water_content,sim_end_year:e.sim_end_year,reduction_start_year:e.reduction_start_year,reduction_end_year:e.reduction_end_year,flow_scenario:e.flow_scenario,load_scenario:e.load_scenario,unsat_scenario:e.unsat_scenario,welltype_scenario:e.welltype_scenario,regions:e.regions,modifications:e.modifications,public:!0,is_base:!1,applied_simulation_filter:e.advancedWellFilter}),{url:"api/model_run/",method:"POST",body:{name:e.name,description:e.description,water_content:e.water_content,sim_end_year:e.sim_end_year,reduction_start_year:e.reduction_start_year,reduction_end_year:e.reduction_end_year,flow_scenario:e.flow_scenario,load_scenario:e.load_scenario,unsat_scenario:e.unsat_scenario,welltype_scenario:e.welltype_scenario,regions:e.regions,modifications:e.modifications,public:!0,is_base:!1,applied_simulation_filter:!1}})}),getAllModelDetail:e.query({query:()=>({url:"api/model_run/",method:"GET"})}),getModelDetailByIds:e.query({query:e=>({url:"api/model_run/?".concat((0,u._)({modelIds:e})),method:"GET"})}),getModelDetail:e.query({query:e=>({url:"api/model_run/".concat(e,"/"),method:"GET"})}),getModelandBaseModelDetail:e.query({query:e=>({url:"api/model_run/".concat(e,"/"),method:"GET",params:{includeBase:!0}})}),getModificationDetail:e.query({query:e=>({url:"api/modification/".concat(e,"/"),method:"GET"})}),getModelResults:e.query({query:e=>({url:"api/model_result/".concat(e,"/"),method:"GET"})}),putModel:e.mutation({query:e=>({url:"api/model_run/".concat(e,"/"),method:"PUT"})}),getModelStatus:e.query({query:e=>({url:"/api/model_run__status/",method:"GET",params:{...e}})})})}),{useRunModelMutation:d,useGetModelDetailQuery:s,useGetModelandBaseModelDetailQuery:c,useGetModelResultsQuery:p,useGetModificationDetailQuery:_,usePutModelMutation:m,useGetAllModelDetailQuery:y,useGetModelDetailByIdsQuery:f,useGetModelStatusQuery:h}=l},629:function(e,r,t){t.d(r,{_:function(){return n}});let n=e=>{let r=new URLSearchParams;for(let t in e)if(Object.hasOwn(e,t)){let n=e[t];Array.isArray(n)?n.forEach(e=>{r.append(t,e)}):r.append(t,n)}return r.toString()}},7938:function(e,r){r.Z=(e,r)=>{let{token:t}=r().auth;return t&&e.set("authorization","Token ".concat(t)),e}},70741:function(e,r,t){t.d(r,{h:function(){return F},RN:function(){return w},V2:function(){return b},eg:function(){return S},vm:function(){return T},cH:function(){return f},FG:function(){return E},lS:function(){return M},xl:function(){return _},pr:function(){return h.pr},qF:function(){return h.qF},YA:function(){return l},M3:function(){return h.M3}});var n=t(90492),a=t(92800),o=t(81631),i=t(52940);let u=(0,a.LC)({baseQuery:(0,o.ni)({baseUrl:i.Z}),endpoints:e=>({login:e.mutation({query:e=>({url:"api-token-auth/",method:"POST",body:e}),transformResponse:e=>{let r={userId:e.user_id,username:e.username,isStaff:e.is_staff,isSuperuser:e.is_superuser,email:e.email},t={token:e.token,user:r};return localStorage.setItem("npsat_user_info",JSON.stringify(t)),t}}),protected:e.mutation({query:()=>"protected"})})}),{useLoginMutation:l,useProtectedMutation:d}=u,s=(0,a.LC)({reducerPath:"crop",baseQuery:(0,o.ni)({baseUrl:i.Z}),endpoints:e=>({getAllCrops:e.query({query:()=>({url:"api/crop/",method:"GET"})}),getAllCropsByFlowScenario:e.query({query:e=>({url:"api/crop/",method:"GET",params:{flow_scenario:e}})}),getCrop:e.query({query:e=>({url:"api/crops/".concat(e),method:"GET"})})})}),{useGetAllCropsQuery:c,useGetCropQuery:p,useGetAllCropsByFlowScenarioQuery:_}=s;var m=t(7938);console.log("api route",i.Z);let y=(0,a.LC)({reducerPath:"feed",baseQuery:(0,o.ni)({baseUrl:i.Z,prepareHeaders:(e,r)=>{let{getState:t}=r;return(0,m.Z)(e,t)}}),endpoints:e=>({fetchFeed:e.query({query:()=>({url:"api/feed/",method:"GET"}),transformResponse:e=>({recentCompletedModels:e.recent_completed_models.map(e=>({dateCompleted:new Date(e.date_completed).toISOString().substring(0,10),dateCreated:new Date(e.date_submitted).toISOString().substring(0,10),description:e.description,id:e.id,isBase:e.is_base,numWells:e.n_wells,name:e.name,public:e.public,reductionEndYear:e.reduction_end_year,reductionStartYear:e.reduction_start_year,simEndYear:"1945 - ".concat(e.sim_end_year),status:e.status,statusMessage:e.status_message,unsatZoneTravelTime:e.unsaturated_zone_travel_time,user:e.user,waterContent:"".concat((100*Number(e.water_content)).toFixed(),"%"),loadScenario:e.load_scenario.name,flowScenario:e.flow_scenario.name,wellTypeScenario:e.welltype_scenario.name,unsatScenario:e.unsat_scenario.name}))})})})}),{useFetchFeedQuery:f}=y;var h=t(80611),g=t(629);let q=(0,a.LC)({reducerPath:"region",baseQuery:(0,o.ni)({baseUrl:i.Z}),endpoints:e=>({fetchCentralValley:e.query({query:()=>({url:"api/region/",method:"GET",params:{offset:0,region_type:0,limit:2e3}})}),fetchBasin:e.query({query:()=>({url:"api/region/",method:"GET",params:{offset:0,region_type:1,limit:2e3}})}),fetchCounty:e.query({query:()=>({url:"api/region/",method:"GET",params:{offset:0,region_type:4,limit:2e3}})}),fetchB118Basin:e.query({query:()=>({url:"api/region/",method:"GET",params:{offset:0,region_type:3,limit:2e3}})}),fetchSubregions:e.query({query:()=>({url:"api/region/",method:"GET",params:{offset:0,region_type:2,limit:2e3}})}),fetchTownship:e.query({query:()=>({url:"api/region/",method:"GET",params:{offset:0,region_type:5,limit:2e3}})}),fetchRegion:e.query({query:e=>({url:"api/region/",method:"GET",params:{offset:0,region_type:e,limit:2e3}})}),getRegionDetail:e.query({query:e=>({url:"api/region/".concat(e),method:"GET"})}),getRegionByIds:e.query({query:e=>({url:"api/model_run/?".concat((0,g._)({regionIds:e})),method:"GET"})})})}),{useFetchTownshipQuery:M,useFetchB118BasinQuery:w,useFetchCentralValleyQuery:S,useFetchBasinQuery:b,useFetchCountyQuery:T,useFetchSubregionsQuery:E,useGetRegionDetailQuery:G,useGetRegionByIdsQuery:C,useFetchRegionQuery:P}=q;var R=t(11525),Z=t(35126);let F=(0,n.xC)({reducer:{[u.reducerPath]:u.reducer,[y.reducerPath]:y.reducer,[q.reducerPath]:q.reducer,[h.Lf.reducerPath]:h.Lf.reducer,[s.reducerPath]:s.reducer,auth:R.ZP,model:Z.sZ},middleware:e=>e().concat(u.middleware).concat(y.middleware).concat(q.middleware).concat(h.Lf.middleware).concat(s.middleware)})},11525:function(e,r,t){t.d(r,{Dj:function(){return a},HF:function(){return o}});let n=(0,t(90492).oM)({name:"auth",initialState:{user:null,token:null},reducers:{setCredentials:(e,r)=>{let{payload:{user:t,token:n}}=r;e.user=t,e.token=n}}}),{setCredentials:a}=n.actions;r.ZP=n.reducer;let o=e=>e.auth.user},35126:function(e,r,t){t.d(r,{AG:function(){return s},Ao:function(){return u},Fu:function(){return C},Hl:function(){return m},KI:function(){return M},Kn:function(){return l},Mi:function(){return g},OO:function(){return w},SU:function(){return b},T0:function(){return T},Uk:function(){return o},_y:function(){return E},eC:function(){return _},fk:function(){return S},fw:function(){return q},kQ:function(){return p},sZ:function(){return G},tD:function(){return a},v3:function(){return d},yB:function(){return i},yn:function(){return c}});let n=(0,t(90492).oM)({name:"model",initialState:{},reducers:{setModelName:(e,r)=>({...e,name:r.payload}),setModelDescription:(e,r)=>({...e,description:r.payload}),setModelWaterContent:(e,r)=>({...e,water_content:r.payload}),setModelSimEndYear:(e,r)=>({...e,sim_end_year:r.payload}),setModelReductionStartYear:(e,r)=>({...e,reduction_start_year:r.payload}),setModelReductionEndYear:(e,r)=>({...e,reduction_end_year:r.payload}),setModelFlowScenario:(e,r)=>({...e,flow_scenario:r.payload}),setModelLoadScenario:(e,r)=>({...e,load_scenario:r.payload}),setModelUnsatScenario:(e,r)=>({...e,unsat_scenario:r.payload}),setModelWelltypeScenario:(e,r)=>({...e,welltype_scenario:r.payload}),setModelRegions:(e,r)=>({...e,regions:r.payload}),setModelPublic:(e,r)=>({...e,public:r.payload}),setModelIsBase:(e,r)=>({...e,is_base:r.payload}),setModelSimulationFilter:(e,r)=>({...e,applied_simulation_filter:r.payload}),setModelScreenLenRangeMin:(e,r)=>({...e,screen_length_range_min:r.payload}),setModelScreenLenRangeMax:(e,r)=>({...e,screen_length_range_max:r.payload}),setModelDepthRangeMin:(e,r)=>({...e,depth_range_min:r.payload}),setModelDepthRangeMax:(e,r)=>({...e,depth_range_max:r.payload}),setModelModifications:(e,r)=>({...e,modifications:r.payload}),setAdvancedWellFilter:(e,r)=>({...e,advancedWellFilter:r.payload}),clearModel:()=>({}),createNewModel:(e,r)=>({...r.payload})}}),{setModelName:a,setModelDescription:o,setModelWaterContent:i,setModelSimEndYear:u,setModelReductionStartYear:l,setModelReductionEndYear:d,setModelFlowScenario:s,setModelLoadScenario:c,setModelUnsatScenario:p,setModelWelltypeScenario:_,setModelRegions:m,setModelPublic:y,setModelIsBase:f,setModelSimulationFilter:h,setModelScreenLenRangeMin:g,setModelScreenLenRangeMax:q,setModelDepthRangeMin:M,setModelDepthRangeMax:w,setModelModifications:S,setAdvancedWellFilter:b,clearModel:T,createNewModel:E}=n.actions,G=n.reducer,C=e=>e.model}}]);