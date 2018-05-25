var a=[2,2,1,3,5,4,7,9];
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
function getMulti(a,b) { return a*b;}
a.filter(x=>x%2===0).filter(onlyUnique).reduce(getMulti)
var neighbor=[];
neighbor[1] =[[2,7],[3,2]];
neighbor[2] =[[1,7],[3,1],[4,1],[6,5]];
neighbor[3] =[[1,2],[2,1],[4,1],[6,3]];
neighbor[4] =[[2,1],[3,1],[5,2]];
neighbor[5] =[[4,2],[6,2]];
neighbor[6] =[[2,5],[3,3],[5,2]];
var all=[];
var visited=[];
function sp(src, dst) {
 var shortest=999;
 var shortest_vertex=999;
 var tonext_length=999;
 visited.push(src);
 console.log([src,dst]);
 console.log(visited);
 if (src==dst) return [dst,0,0];
 else for (i=0;i<neighbor[src].length-1;i++ && (next_vertex=neighbor[src][i][0]))
  if (!visited.includes(next_vertex)) {
   tonext_length=neighbor[src][i][1];
   visited.push(next_vertex);
   current=tonext_length+sp(next_vertex,dst)[1];
   all.push([next_vertex,tonext_length,current]);
   if (current<shortest) {shortest_vertex=next_vertex; shortest=current;}
  }
  console.log(all);
  console.log([shortest_vertex,shortest]);
  return [shortest_vertex,shortest,tonext_length];
}

