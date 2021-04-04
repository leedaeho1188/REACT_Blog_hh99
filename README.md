<img width="500" src="https://blog.kakaocdn.net/dn/dkjJsx/btq1BxKnuFQ/sTELvaUHNgfLx80E8K9Y4K/img.png">

# REACT\_Blog

항해99 5주차는 리액트 심화 내용들을 주어진 강의를 들으면서 공부하고, 공부한 내용을 바탕으로 프로젝트를 완성시켰습니다. 프로젝트는 매운맛과 순한맛이 있었는데, 이왕 하는거 매운맛으로 했습니다. 🌶

<br>

## <느낀점>

2주가 이렇게 길수가 있었던가?? 주특기를 배우는 2주는 마치 2달 같았다. 이번주는 리액트 심화과정이였는데, **기본 주차 배운것을 기반으로 좀더 많은 기능들을 구현해볼 수 있는 주차였던 것 같다.** 제공된 강의 시간 만 무려 15시간이 넘었고 그것을 2일만에 다 듣고 프로젝트를 하는것이 좀 힘들었다..ㅜ 그래도 열심히 하니까 어느정도 따라갈 수 있었다. 기본 주차 때 개념들을 이해하고 올라온게 많은 도움이 됬던 것 같다. 전 주에 다루는 데이터 양도 훨씬 많아지고, 파일 수도 5배는 더 많아졌다. 양이 많다보니 저번주처럼 배운내용을 머리에 다 넣기가 힘들었는데, 오늘 **이렇게 한 주를 돌아보며 배운것들을 정리하니까 좀 머리에 정리가 되는 것 같아서 다행이다.😀** 

<br>

이번주는 저번주보다는 사람들을 많이 도와주지는 못했던것 같다. 사람들이 잘 안물어본것도 있고, 나도 공부량이 너무 많아서 알려주는게 한계가 있었다. 도움을 청하는데 나도 해야될게 쌓여있으면 참 마음이 불편했다...ㅜ 안 도와주면 미안하고 도와주면 마음이 더 조급해지고.. 근데 지금 생각해보면 내가 아는거면 도와주는게 맞다고 생각한다. **좀더 마음에 여유를 가지고 항해99를 진행 했으면 한다.** 다른 사람이 나보다 잘한다고 마음 조급해하지 말고 나는 내 속도에 맞게 목표를 가지고 차분하게 공부해나갔으면 좋겠다. 민영튜터님이 이런말씀을 해주셨다. 개발을 할 때는 어려운 상황이 닦치면 더 침착해져야 된다고 하셨다. 그래야 두뇌회전이 잘되고 문제를 해결할 수 있다고 하셨다. **침착하고 차분하게 문제를 해결해나가는 그런 개발자가 되고싶다.** **2주동안 최선을 다해서 도와주신 민영튜터님한테 정말 감사드린다!😄**


<br>

## <배운것>

### **사용한 개념**

1\. **폴더 구조** 잡기

    - 폴더 구조는 **shared, redux, pages, components**로 나눴습니다. 

    - elements까지 쪼개는 법을 배웠지만, 프로젝트를 할 때는 사용하지 않았습니다.

2\. **OAuth 동작 방식**을 사용해서 인증하고 **Session Storage**에 값을 저장했습니다.

3\. **firebase Authentication**에서 회원 정보를 저장하고 인증했습니다.

4\. **Firebase Storage**에다가 이미지를 저장했습니다.

5\. **throttle** 사용해서 일정 시간동안 일어난 이벤트를 모아서 1번씩 실행했습니다.

6\. **findIndex()**를 이용해서 해당 배열안에 값이 있는지 확인했습니다.

<br>

### **기능 구현**


### **1\. 로그인/ 회원가입 모달 만들기**

로그인 회원가입은 모달로 만들었습니다. 회원가입을 할 때 **firebase Authentication**에다가 아이디, 패스워드, 유저 이름을 저장했습니다. 로그인을 할 때는 firebase에 해당 id와 password값이 맞는게 있으면 **Session\_Storage**에 세션 값이 저장되고 redux store에도 해당 유저 정보가 저장이 됩니다. 그래서 로그인을 했을 때 헤더에 로그이 회원가입이 더이상 뜨지 않고, 게시물 작성과 로그아웃 버튼이 보입니다. 로그인을 했는지 않했는지는 Session Storage에 값이있고 redux store에 **is\_login**이 true인지 확인을 했습니다.

더보기

<img width="500" src="https://blog.kakaocdn.net/dn/bk1YNm/btq1R9gFvik/n5HaY9c8fF4OwB5M2xcr61/img.png">

<img width="500" src="https://blog.kakaocdn.net/dn/BDrsS/btq1KBZ3ScK/TbJUDcfcQNS5rq3AZ3M150/img.png">
```
const loginFB = (id, pwd) => {
  return function (dispatch, getState){
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          console.log(user);
          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              uid: user.user.uid,
            })
          )
        }
        ).catch((error) => {
          console.log(error.message)
        })
      });
    };
  };
```

```
const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth.createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        console.log(user);
        auth.currentUser.updateProfile({
          displayName: user_name,
        }).then(() => {
          dispatch(
            setUser({
              user_name: user_name,
              id: id,
              uid: user.user.uid,
            })
          )
        }).catch((error) => {
          console.log(error)
        })

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage)
      })
  }
}
```

<br>

### **2\. 게시글 작성 페이지 만들기**

게시글 작성에있는 데이터는 프로젝트 이미지, 프로젝트 이름, 프로젝트 URL, 프로젝트 설명, 레이아웃 옵션이 있습니다. 프로젝트 이미지는 input type = file을 사용해서 이미지 파일을 가져옵니다. 그리고 이미지 파일을 가져왔을 때 **preview**기능을 만들어서 선택한 이미지가 화면에 어떻게 뜨는지 보여줍니다. preview기능은 onChange를써서 input에서 선택되는 파일이 바뀔 때마다 preview기능을 만들어내는 함수가 실행되서 바로 바뀐 이미지를 보여줍니다. 어떤 이미지도 선택하지 않고 취소를 눌렀을 때는 onChange에서는 값이 바뀌었기 때문에 함수가 실행되는데 파일 정보가 null이기 때문에 if을 써서 오류가 일어나지 않게 해주어야합니다.

다른 데이터들은 작성한 값들을 **firestore**에 저장합니다. 저장할 때는 게시물을 작성한 시간 값도 넣어줍니다. 한가지 더 추가하자면 이미지파일은 firestore말고 **storage**에 저장을 하고 저장된 파일 값을 **url주소**로 바꾼다음에 게시물 데이터에 저장합니다.

더보기

<img width="500" src="https://blog.kakaocdn.net/dn/bg2nvo/btq1R8B5VsE/AFRSwi1Trt0GK3EIeIiKN0/img.png">

 **preview 기능**을 구현하는 함수입니다.

```
const selectFile = () => {
    console.log(fileInput.current.files[0])
    const reader = new FileReader();
    const file = fileInput.current.files[0]
    if (file == undefined){
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
      return
    }
    reader.readAsDataURL(file);
  
    reader.onloadend = () => {
      console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result))
    }
  }
  
  return(
    <>
      <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading} />
      {/* <button onClick={uploadFB}>업로드하기</button> */}
    </>
  )
```

<br>

**게시물 작성** post module 코드입니다.

```
const addPostFB = (post) => {
  return function (dispatch, getState) {
    const postDB = firestore.collection("post");
    const _user = getState().user.user

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
    };

    const _post = {
      ...initialPost,
      contents: post.contents,
      layout: post.layout,
      url: post.url,
      name: post.name,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    const _image = getState().image.preview;

    console.log(_image);
    console.log(typeof _image);

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL()
      .then((url) => {
        console.log(url);
        dispatch(imageActions.uploadImage(url));
        return url;
      }).then((url) => {
        console.log(url)
        postDB
        .add({ ...user_info, ..._post, image_url: url })
        .then((doc) => {
          let post_list = { user_info, ..._post, id: doc.id, image_url: url }
          dispatch(addPost(post_list))
          dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
          history.replace("/")
        }).catch((err) => {
          window.alert("포스트 작성에 문제가 있어요!")
        })
      })
    }).catch((err) => {
      window.alert("이미지 업로드에 문제가 있어요!")
      console.log(err);
    })

  }
}
```

<br>

### **3\. 게시글 레이아웃 옵션 주기**

프로젝트 필수 기능중 하나가 게시물 레이아웃 옵션 3개를 주어서 사용자들이 선택할 수 있게 하는것이였습니다. **라디오 버튼**을 사용해서 **useState**로 값이 변할 때마다 해당 값을 받아주고 그 값에 맞는 레이아웃이 화면에 보여지게 했습니다. 레이아웃 값도 firestore와 리덕스에 저장했습니다.

더보기

<img width="500" src="https://blog.kakaocdn.net/dn/kKFVj/btq1KBltLIP/Br3B5BKUkPmN14K9QNy1Q0/img.png">

<img width="500" src="https://blog.kakaocdn.net/dn/bqf2WW/btq1JV5K3i5/kFR6QUhnoK7hDbtOJW1PV0/img.png">

<img width="500" src="https://blog.kakaocdn.net/dn/2yiH9/btq1MpSo43A/JemsjOn2OmiY7Y9aOfKto0/img.png">

### **4\. 게시글 메인 페이지 만들기**

작성한 게시글들을 나열해놓는 메인 페이지를 구현했습니다. firestore에서 게시물 데이터들을 가지고 올 때 게시물 작성 데이터들 중에 작성한 날짜가 늦은 순으로 데이터를 뽑아내고 map을 이용해서 나열했습니다. 메인 페이지에서는 **무한 스크롤링**을 구현했습니다. 그래서 db에있는 모든 게시물 데이터를 가져오는것이아니라 n개씩만 가져와서 스크롤이 어느정도 밑으로 내려같을 때 그 다음 게시물 n개를 가져왔습니다. 다음에 나와야될 게시물이 어떤건지 아는 방법은 게시물을 n+1개를 먼저 가져오고 불러온 데이터에서 마지막 데이터가 다음에 나올 데이터들 중에서 첫번째 데이터로 세팅을하고 그 다음부터 나오게하면 됩니다. 

더보기

**무한스크롤** 구현 함수 코드

```
const InfinityScroll = (props) => {

  const {children, callNext, is_next, loading, next} = props;

  const _handleScroll = _.throttle(() => {
    if(loading){
      
      return;
    }
    const {innerHeight} = window;
    const {scrollHeight} = document.body;
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if(scrollHeight - innerHeight - scrollTop < 200){
      callNext();
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [loading])

  React.useEffect(() => {
    if(loading){
      return;
    }
    if(is_next){
      window.addEventListener("scroll", handleScroll);
    }else{
      window.removeEventListener("scroll", handleScroll);
    }
  }, [is_next, loading]);

  return(
    <React.Fragment>
      {props.children}
      {is_next && (<Spinner/>)}
    </React.Fragment>
  )
}
```

<br>

**게시물 데이터 GET** module 코드

```
const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState) {
    let _paging = getState().post.paging;
    if(_paging.start && !_paging.next){
      return;
    }

    dispatch(loading(true))
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc")
    
    if(start){
      query = query.startAt(start);
    }

    query.limit(size + 1).get().then((docs) => {
      let post_list = [];

      let paging = {
        start: docs.docs[0],
        next: docs.docs.length === size+1? docs.docs[docs.docs.length -1] : null,
        size: size,
      }
      docs.forEach((doc) => {
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1){
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return {...acc, [cur]: _post[cur]};
          },
          { id: doc.id, user_info: {} }
        );
        
        post_list.push(post);
      })
      if(post_list.length > size){
        post_list.pop();
      }

      console.log(post_list);

      dispatch(setPost(post_list, paging))
      
    })
  }
}
```

<br>

### **5\. 게시글 좋아요 기능 구현하기**

좋아요 기능은 사용자가 로그인을 했을 때 사용할 수 있게 했습니다. 로그인을 한 사용자가 한 게시물의 하트 버튼을 눌렀을 때 핑크색이였던 하트버튼을 사라지게 하고 빨간색 버튼이 보여지게 했습니다. **삼항 연산자**를 사용해서 구현했습니다. 그리고 **findIndex**를 사용해서 사용자가 해당 포스트에 좋아요를 눌렀는지 안눌렀는지 확이했습니다. 좋아요 기능은 각각에 게시물에 좋아요를 누른 사용자 id 값을 배열안에 저장을 하고 좋아요 함수와 좋아요 취소 함수를 만들어서 기능을 구현했습니다. 

더보기

**좋아요 함수와 좋아요 취소 함수** 코드입니다.

```
const likeSubmit = () => {
    if(!is_login){
      window.alert("😀로그인 해야 할 수 있어요!")
      return
    }
    let like_id;
    if(props.like_id.length === 0){
      like_id = [user_info.uid];
    } else {
      like_id = [...props.like_id, user_info.uid]; 
    }
    let cnt = props.like_cnt + 1;
    
    let post = {
      like_cnt : cnt,
      like_id : like_id
    }
    let post_id = props.id;
    dispatch(postActions.editLikeFB(post, post_id))
  }

  const dislikeSubmit = () => {
    let like_id = props.like_id.filter((l, idx) => {
      if(l !== user_info.uid){
        return [...like_id, l]
      }
    })
    let cnt = props.like_cnt - 1;
    let post = {
      like_cnt : cnt,
      like_id : like_id
    }
    let post_id = props.id;
    dispatch(postActions.editLikeFB(post, post_id))
  }
```

사용자가 해당 포스트를 좋아요를 눌렀는지 알기위한 코드입니다.

```
const idx = props.like_id.findIndex((l) => l === user_info.uid);
const is_like = idx !== -1 ? true : false
```

<br>

### **6\. 게시글 디테일 페이지 만들기(수정하기 & 삭제하기)**

게시글 디테일 페이지는 게시글 사진을 눌렀을 때 해당 게시글 id값을 가진 주소로 만들어집니다. 디테일 페이지로 넘어가면 **해당 게시물을 작성한 사람만 수정하기 삭제하기 버튼**을 볼 수 있습니다. 수정하기 버튼을 누르면 게시물 작성페이지에서  게시글 id값이 추가된 주소로 넘어갑니다. 이제 그 페이지에서 게시글을 수정 할 수 있습니다. 삭제 버튼을 누르면 말그대로 게시글 데이터가 firestore에서 그리고 리덕스에서 삭제가됩니다.

더보기

<img width="500" src="https://blog.kakaocdn.net/dn/bRYqPi/btq1KCdGze0/r7Ll7v7mahJ3Jl4I3N5F80/img.png">

게시물 **수정 & 삭제** post module 코드입니다.

```
const removePostFB = (id) => {
  return function(dispatch) {
    const postDB = firestore.collection("post");
    postDB.doc(id).delete().then(() => {
      dispatch(removePost(id))
      history.replace('/')
    } )
  }
}

const editPostFB = (post_id = null, post) => {
  return function (dispatch, getState) {
    if(!post_id){
      console.log("게시물 정보가 없어요!");
      return;
    }
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    const postDB = firestore.collection("post");

    if (_image === _post.image_url) {
      postDB.doc(post_id).update(post).then((doc) => {
        dispatch(editPost(post_id, post));
        history.replace("/");
      });
      return
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`image/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          return url
        })
        .then((url) => {
          postDB.doc(post_id)
                .update({ ...post, image_url: url })
                .then((doc) => {
                  dispatch(editPost(post_id, {...post, image_url: url}))
                  history.replace("/")
                })
        })
        .catch((err) => {
          window.alert("이미지 업로드에 문제가 있습니다!")
        })
      })

    }
  }
}
```
