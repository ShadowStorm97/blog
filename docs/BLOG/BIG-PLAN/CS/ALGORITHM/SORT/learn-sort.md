# 100%弄懂排序

本文作为一篇个人学习的笔记，将梳理所有排序算法、稳定性、工程上的优化。

## 从时间复杂度、实现方案看算法分类

### 基于比较的排序

#### O(N²)

- 插入排序
- 冒泡排序
- 选择排序

#### O(N * logN)

- 快速排序
- 归并排序
- 堆排序

### 桶排序

#### O(N)

- 计数排序
- 基数排序

> 排序算法可以分为两个大类，基于比较的排序和桶排序。前者相对通用，只关心元素之间的比较定义，对数据集没有特殊要求。而后者刚好相反，不关心元素之间的比较定义，但对数据集样本有严苛的定义，若一旦数据集变动不满足条件，则算法原生无法支持。

## 算法实现

> 由于排序算法实现中会频繁使用到交换数组的两个元素，将该方法抽出来：

```
//常规版本
func swap(arr []int,i,j int){
    temp := arr[i]    
    arr[i] = arr[j]    
    arr[j] = temp
}

//算术运算版本 (需要注意，有溢出风险)
func swap(arr []int,i,j int){
    arr[i] =  arr[i] + arr[j]    
    arr[j] =  arr[i] - arr[j]    
    arr[i] =  arr[i] - arr[j]
}

//位运算版本 (需要注意,若i和j为同一位置，会丢失数据)
func swap(arr []int,i,j int){
    arr[i] ^= arr[j]    
    arr[j] ^= arr[i]    
    arr[i] ^= arr[j]
}
```

### O(N²)

#### 插入排序
```
func insertSort(arr []int){
    if arr == nil || len(arr) < 2 {
        return    
    }    
    for i := 1;i < len(arr);i++{
        //当前值为j+1,前一个值为j        
        //每一轮，当前值(j+1)往前看,如果当前值的位置到0,或者,前面的大于当前值时才交换
        for j := i-1; j >= 0; j-- {
            if arr[j] <= arr[j+1] {
                break            
            }
            swap(arr,j,j+1)       
        } 
    }
}
```
#### 选择排序
```
func selectSort(arr []int){
    if arr == nil || len(arr) < 2 {
        return    
    }    
    //每轮找到最小的那个值,与当前第一位进行交换,进行N轮查找    
    for i := 0;i < len(arr);i++{
        min,index := i,i        
        //每一轮查找        
        for j := i+1;j < len(arr);j++{
            if arr[j] < arr[min] { 
                min = j            
            }        
        }        
        swap(arr,min,index)
        index++   
    }
}
```
#### 冒泡排序
```
func bubbleSort(arr []int){    
    if arr == nil || len(arr) < 2 {
        return    
    }    
    //每一轮确定一个位置    
    for i := 0;i < len(arr);i++{
        //当前值与下一位进行比较,如果当前值比下一位值大,则交换        
        for j := 0;j < len(arr)-1;j++{            
            if arr[j] > arr[j+1] {                
                swap(arr,j,j+1)            
            }        
        }    
    }
}
```
### O(N*LogN)

#### 快速排序

```
func sortArray(nums []int) []int {
    quickSort(nums, 0, len(nums)-1)
    return nums
}

// 递归调用，经典二分
func quickSort(nums []int, left, right int) {
    if left >= right {
        return
    }
    mid := partition(nums, left, right)
    quickSort(nums, left, mid-1)
    quickSort(nums, mid+1, right)
}

// 分区函数，快排核心
func partition(nums []int, left, right int) int {
    // 选择 left 作为基准
    standard, start := nums[left], left
    for left < right {
        // 右边先出发
        for left < right && nums[right] >= standard {
            right--
        }
        // 左边也出发
        for left < right && nums[left] <= standard {
            left++
        }
        // 相遇结束
        if left >= right {
            break
        }
        // 否则交换两个数
        swap(nums, left, right)
    }
    // 把基准归位
    swap(nums, start, left)
    // 返回基准位置
    return left
}
```

#### 归并排序

```
func sortArray(nums []int) []int {
    return mergeSort(nums, 0, len(nums)-1)
}

// 递归调用, 经典二分
func mergeSort(nums []int, left, right int) []int {
    if left == right {
        return []int{nums[left]}
    }
    mid := (left + right) / 2
    arr1 := mergeSort(nums, left, mid)
    arr2 := mergeSort(nums, mid+1, right)
    return merge(arr1, arr2)
}

// 归并排序核心, 将两个有序数组做归并
func merge(arr1, arr2 []int) []int {
    temp, i, j := make([]int, 0), 0, 0
    // 如果两个数组都有值，则依次取首位做比较
    for len(arr1) > 0 && len(arr2) > 0 {
        if i >= len(arr1) || j >= len(arr2) {
            break
        }
        if arr1[i] > arr2[j] {
            temp = append(temp, arr2[j])
            j++
        } else {
            temp = append(temp, arr1[i])
            i++
        }
    }
    // 程序执行到这里时，一定有一方数组被掏空了
    for i < len(arr1) {
        temp = append(temp, arr1[i])
        i++
    }
    for j < len(arr2) {
        temp = append(temp, arr2[j])
        j++
    }
    return temp
}
```
#### 堆排序

```
func sortArray(nums []int) []int {
    heapSort(nums)
    return nums
}

func heapSort(nums []int) {
    len := len(nums) - 1
    //建堆
    buildMaxHeap(nums, len)
    //
    for i := len; i >= 1; i-- {
        swap(nums, i, 0)
        len -= 1
        maxHeapify(nums, 0, len)
    }
}

//从下往上建堆,O(N) 并且后1/2的节点都是叶子节点,天然满足大根堆的性质
func buildMaxHeap(nums []int, len int) {
    for i := len / 2; i >= 0; i-- {
        maxHeapify(nums, i, len)
    }
}

func maxHeapify(nums []int, i, len int) {
    for (2*i)+1 <= len {
        lson := (2*i) + 1
        rson := (2*i) + 2
        large := 0
        if lson <= len && nums[lson] > nums[i] {
            large = lson
        } else {
            large = i
        }
        if rson <= len && nums[rson] > nums[large] {
            large = rson
        }
        if large != i {
            swap(nums, i, large)
            i = large
        } else {
            break
        }
    }
}
```

### O(N)

#### 计数排序

```
func countSort(nums []int) []int {
    // 先找到边界
    max := 0
    for _, v := range nums {
        if v > max {
            max = v
        }
    }
    // 建桶
    array := make([]int, max+1)
    // 将原数组的数据入桶
    for _, v := range nums {
        array[v] += 1
    }
    // 用桶里的数据覆盖原nums数组
    index := 0
    for i, v := range array {
        for v > 0 {
            nums[index] = i
            index++
            v--
        }
    }
    return nums
}
```
#### 基数排序

## 时间复杂度分析



### O(N²)

#### 插入排序

> 插入排序的核心思想，一开始从[0,0]范围开始，此范围是有序的，将范围扩大到[0,1],此时相当于向[0,0]范围插入了一个值,插入值与前面的值进行比较,如果较小,则一直冒泡直到到达第N小的位置

> 由此可分析出,在插入排序中,该算法与待排序的数据集有序程度有相关性

原始数据集: 1,2,3,4,5

- 插入2时,只比较一次,停止;
- 每一轮都如此,只比较一次,停止;
- 此数据集是最佳情况,时间复杂度为:O(N)
原始数据集: 5,4,3,2,1

- 插入4时,比较一次,停止;
- 插入3时,比较两次;
- 很明显个等差数列
- 此数据集是最坏情况,时间复杂度为:O(N²)
> 结论 :  插入排序的最佳时间复杂度:O(N),最差时间复杂度:O(N²),则插入排序的时间复杂度取最差的结果O(N²)

#### 选择排序

> 首先这个算法是与数据集的有序程度无关的算法。因为无论数据集是否有序，不影响双层循环的运行次数

> 结论 :  选择排序很明显是个指数级的排序算法，双层循环，内轮循环每次确定一位当前最小值，外轮循环驱动走N次，时间复杂度稳定在O(N²)

#### 冒泡排序

> 这个算法依旧是与数据集的有序程度无关的算法。因为无论数据集是否有序，不影响双层循环的运行次数

> 结论 : 时间复杂度稳定在O(N²)

### O(N*LogN)

> 递归函数时间复杂度分析 (Master Theorem)

> 适用场景：递归函数处理的问题总规模为N,将主问题拆分成相同规模的更小规模(N/b)的子问题,并且对子问题调用了a次，最后除去子问题调用，剩下的时间复杂度为O(Nd)时

> **注意：如果递归函数处理的问题总规模为N，单子问题的规模拆分不统一,则公式无效**

假设L .. R 上有n个数，求T(N)
master公式:**T(N) = a * T(N/b) + O(N^d)**

- Logba > d , T(N) = O(N^Logba)
- Logba < d , T(N) = O(N^d)
- Logba = d , T(N) = O(N^d * LogN)

#### 快速排序
```
// 递归调用, 经典二分
func quickSort(nums []int, left, right int) {
    if left >= right {
        return
    }
    mid := partition(nums, left, right)
    quickSort(nums, left, mid-1)
    quickSort(nums, mid+1, right)
}
```
主流程为二分调用quickSort + merge，调用mergeSort的时间复杂度为T(N/2), partition的时间复杂度为O(N)， 则

> T(N) = 2*T(N/2) + O(N)

带入公式分析
```
a = 2 ，b = 2 ,  d = 1Logba = log22 = 1  , logba == d == 1
```
O(Nd* LogN) = O(N1*LogN) = O(N * LogN)

> 结论：归并排序的时间复杂度为：O(N * LogN)

#### 归并排序
```
// 递归调用, 经典二分
func mergeSort(nums []int, left, right int) []int {
    if left == right {
        return []int{nums[left]}
    }
    mid := (left + right) / 2
    arr1 := mergeSort(nums, left, mid)
    arr2 := mergeSort(nums, mid+1, right)
    return merge(arr1, arr2)
}
```
主流程为二分调用mergeSort + merge，调用mergeSort的时间复杂度为T(N/2), merge的时间复杂度为O(N)， 则

> T(N) = 2*T(N/2) + O(N)

带入公式分析
```
a = 2 ，b = 2 ,  d = 1Logba = log22 = 1  , logba == d == 1
```
O(Nd* LogN) = O(N1*LogN) = O(N * LogN)

> 结论：归并排序的时间复杂度为：O(N * LogN)

#### 堆排序
```
func heapSort(nums []int) {
    len := len(nums) - 1
    // 建堆
    buildMaxHeap(nums, len)
    for i := len; i >= 1; i-- {
        swap(nums, i, 0)
        len -= 1
        maxHeapify(nums, 0, len)
    }
}
```
主流程为N次调用maxHeapify + buildMaxHeap，调用buildMaxHeap的时间复杂度为O(N), maxHeapify的时间复杂度为O(LogN)

> 结论：堆排序的时间复杂度为：O(N * LogN)



## 稳定性

## 选择排序的策略

## 工程上的优化

